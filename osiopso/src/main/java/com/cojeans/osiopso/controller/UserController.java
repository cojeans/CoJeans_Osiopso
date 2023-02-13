package com.cojeans.osiopso.controller;

import com.cojeans.osiopso.dto.ApiRequestDto;
import com.cojeans.osiopso.dto.ApiResponseDto;
import com.cojeans.osiopso.dto.user.*;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.exception.BadRequestException;
import com.cojeans.osiopso.exception.ResourceNotFoundException;
import com.cojeans.osiopso.repository.user.UserRepository;
import com.cojeans.osiopso.security.TokenProvider;
import com.cojeans.osiopso.security.UserDetail;
import com.cojeans.osiopso.service.user.EmailAuthService;
import com.cojeans.osiopso.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@Slf4j
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "회원 API")
public class UserController{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailAuthService emailAuthService;

    @GetMapping("")
    @Operation(summary = "내정보조회")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        UserDetail userDetail = (UserDetail) authentication.getPrincipal();

//        User user = userRepository.findById(userDetail.getId())
//                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userDetail.getId()));

//        return new ResponseEntity<>(user.toDto(), HttpStatus.OK);
        return new ResponseEntity<>(userService.getMine(userDetail), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    @Operation(summary = "다른회원조회")
    public ResponseEntity<UserDto> getUser(@PathVariable Long userId, @AuthenticationPrincipal UserDetail userDetail) {
//        UserDto userDto = userRepository.findById(userId).orElse(null).toDto();
//
//        return new ResponseEntity<>(userDto, HttpStatus.OK);
        return new ResponseEntity<>(userService.getUser(userId, userDetail), HttpStatus.OK);
    }

    /*
    * 리턴타입 수정
    *
    * */
    @Operation(summary = "회원수정", description = "변경후 변경 완료된 userDto를 반환해서 그대로 redux에 저장된 유저객체에 덮어씌우면 될듯합니다.")
    @PutMapping("")
    public ResponseEntity<UserDto> EditUser(@RequestBody UserModifyDto userModifyDto) {
        log.info("userModifyDto: {}",userModifyDto);
        UserDto userDto = userService.editUser(userModifyDto);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @Operation(summary = "비밀번호변경", description = "비밀번호 변경 전 비밀번호 체크페이지를 통과해야한다.")
    @PostMapping("/modifyPassword")
    public ResponseEntity<ApiResponseDto> modifyPassword(@RequestBody ApiRequestDto apiRequestDto, @AuthenticationPrincipal UserDetail userDetail) {
        String password = apiRequestDto.getMessage();
        try {
            userService.modifyPassword(password, userDetail.getId());
        } catch (BadRequestException e) {
            return new ResponseEntity<>(ApiResponseDto
                    .builder()
                    .success(false)
                    .message("비밀번호변경중 오류발생")
                    .build()
                    ,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(ApiResponseDto
                .builder()
                .success(true)
                .message("비밀번호 변경완료")
                .build()
                , HttpStatus.OK);
    }


    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> loginUser(@RequestBody LoginRequestDto loginRequestDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getEmail(),
                        loginRequestDto.getPassword()
                )
        );
        /*이메일 인증 체크*/
        if(!userService.isEmailVerified(loginRequestDto.getEmail())){
            return new ResponseEntity<>(AuthResponseDto.builder()
                    .success(false)
                    .message("이메일 인증이 필요합니다.").build(),HttpStatus.OK);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.createToken(authentication);

        return ResponseEntity.ok(AuthResponseDto.builder().success(true).message("로그인 성공").accessToken(token).build());
    }


    @Operation(summary = "회원가입")
    @PostMapping("/signUp")
    public ResponseEntity<ApiResponseDto> registerUser(@RequestBody SignUpRequestDto signUpRequest) {
        log.info("signUpRequest: {}",signUpRequest);

        userService.saveUser(signUpRequest);
        emailAuthService.sendVerificationEmail(signUpRequest.getEmail());

        return new ResponseEntity(new ApiResponseDto(true, "User registered successfully@", null), HttpStatus.CREATED);
    }

    @Operation(summary = "비밀번호확인", description = "현재로그인되어있는 유저를 토큰에서 꺼내 입력받은 비밀번호를 인코딩해서 비교")
    @PostMapping("/checkPassword")
    public ResponseEntity<ApiResponseDto> isPasswordMatch(@RequestBody ApiRequestDto apiRequestDto, @AuthenticationPrincipal UserDetail userDetail){
        boolean isPasswordMatch = userService.isPasswordMatch(apiRequestDto.getMessage(),userDetail.getPassword());
        log.info("isPasswordMatch: "+isPasswordMatch);

        if(!isPasswordMatch){
            return new ResponseEntity<>(ApiResponseDto.builder()
                    .success(false)
                    .message("비밀번호 불일치").build()
                    ,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(ApiResponseDto.builder()
                .success(true)
                .message("비밀번호 일치").build()
                ,HttpStatus.OK);
    }

    @Operation(summary = "이메일 중복체크")
    @PostMapping("/isEmailExist") //GET? POST? 민우랑 상의
    public ResponseEntity<ApiResponseDto> isEmailExist(@RequestBody ApiRequestDto apiRequestDto) {
        String email = apiRequestDto.getMessage(); //null, trim 체크 앞단에서 하고 들어와야
        if(userService.isEmailExist(email)){
            return new ResponseEntity<>(ApiResponseDto.builder()
                    .message("존재하는 이메일입니다.")
                    .success(true).build(),HttpStatus.OK); //존재하면 success를 false 하지만 httpstatus는 ok
        }
        return new ResponseEntity<>(ApiResponseDto.builder()
                .message("존재하지 않는 이메일입니다.")
                .success(false).build(),HttpStatus.OK); //존재하면 success를 false 하지만 httpstatus는 ok
    }


    @Operation(summary = "회원탈퇴", description = "탈퇴 후 로컬스토리지 삭제해줘 민우야 브라보")
    @DeleteMapping("")
    public ResponseEntity<ApiResponseDto> deleteUser(@AuthenticationPrincipal UserDetail userDetail) {
        userRepository.deleteById(userDetail.getId());


        return new ResponseEntity<>(
                ApiResponseDto.builder()
                .success(true)
                .message("회원탈퇴완료").build()
                , HttpStatus.ACCEPTED);
    }

    @Operation(summary = "팔로우하기", description = "팔로우하기 버튼을 누르면 팔로잉-팔로워 관계 생성/삭제")
    @PostMapping("/follow")
    public ResponseEntity<ApiResponseDto> followUser(@RequestParam Long followingId, @AuthenticationPrincipal UserDetail userDetail){
        // 지금은 이메일로 받습니다... 추후에 id를 받는 것으로 수정할 수 있습니다.
        userService.followUser(followingId, userDetail);

        return new ResponseEntity<>(
                ApiResponseDto.builder()
                        .success(true)
                        .message("팔로우 상태 갱신 완료")
                        .build()
                        ,HttpStatus.ACCEPTED);

    }

//    @Operation(summary = "언팔로우하기", description = "언팔로우하기 버튼을 누르면 팔로잉-팔로워 관계 삭제")
//    @DeleteMapping("/unfollow")
//    public ResponseEntity<ApiResponseDto> unfollowUser(@RequestParam String email, @AuthenticationPrincipal UserDetail userDetail){
//        // 지금은 이메일로 받습니다... 추후에 id를 받는 것으로 수정할 수 있습니다.
//        userService.unfollowUser(email, userDetail);
//
//        return new ResponseEntity<>(
//                ApiResponseDto.builder()
//                        .success(true)
//                        .message("언팔로우 완료")
//                        .build()
//                ,HttpStatus.ACCEPTED);
//
//    }

    @Operation(summary = "팔로워 리스트", description = "특정 유저를 팔로우하고 있는 계정 리스트")
    @PostMapping("/followers")
    public ResponseEntity<ApiResponseDto> listFollower(@RequestParam Long followingId, @AuthenticationPrincipal UserDetail userDetail){
        // 지금은 이메일로 받습니다... 추후에 id를 받는 것으로 수정할 수 있습니다.

        return new ResponseEntity<>(
                ApiResponseDto.builder()
                        .success(true)
                        .message(followingId + " 의 팔로워 리스트")
                        .responseData(userService.listFollower(followingId))
                        .build()
                ,HttpStatus.OK);

    }

    @Operation(summary = "팔로잉 리스트", description = "특정 유저가 팔로우하고 있는 계정 리스트")
    @PostMapping("/followings")
    public ResponseEntity<ApiResponseDto> listFollowing(@RequestParam Long followingId, @AuthenticationPrincipal UserDetail userDetail){
        // 지금은 이메일로 받습니다... 추후에 id를 받는 것으로 수정할 수 있습니다.

        return new ResponseEntity<>(
                ApiResponseDto.builder()
                        .success(true)
                        .message(followingId + " 의 팔로잉 리스트")
                        .responseData(userService.listFollowing(followingId))
                        .build()
                ,HttpStatus.OK);

    }
    @Operation(summary = "이메일 인증", description = "유저가 메일에서 활성화링크 눌렀을 때 오는것으로 백에서 씁니다.")
    @GetMapping("/emailVerification/{code}")
    public ResponseEntity<ApiResponseDto> verifyAccount(@PathVariable String code) {
        log.info("verifyAccount code :", code);
        emailAuthService.verifyAccount(code);
        return new ResponseEntity<>(ApiResponseDto.builder()
                .success(true)
                .message("계정활성화가 성공적으로 완료됐습니다.")
                .build(), HttpStatus.OK);
    }
    @Operation(summary = "공개범위 바꾸기", description = "IsProfilePublic칼럼을 반대로 토글시켜주고 바뀐 userDto객체를 반환.")
    @GetMapping("/modifyIsProfilePublic/{id}")
    public ResponseEntity<ApiResponseDto> modifyIsProfilePublic(@PathVariable Long id) {
        boolean modifyResult = userService.modifyIsProfilePublic(id);
        /*실패 시*/
        if(!modifyResult)
            return new ResponseEntity<>(ApiResponseDto
                    .builder()
                    .success(false)
                    .message("공개범위 변경 실패")
                    .build()
                    , HttpStatus.BAD_REQUEST);

        /*성공 시*/
        return new ResponseEntity<>(ApiResponseDto
                .builder()
                .success(true)
                .message("공개범위 변경 성공")
                .build()
                , HttpStatus.OK);
    }
}





