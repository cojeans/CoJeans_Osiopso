package com.cojeans.osiopso.controller;

import com.cojeans.osiopso.dto.ApiRequestDto;
import com.cojeans.osiopso.dto.ApiResponseDto;
import com.cojeans.osiopso.dto.user.AuthResponseDto;
import com.cojeans.osiopso.dto.user.LoginRequestDto;
import com.cojeans.osiopso.dto.user.SignUpRequestDto;
import com.cojeans.osiopso.dto.user.UserDto;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.exception.BadRequestException;
import com.cojeans.osiopso.exception.ResourceNotFoundException;
import com.cojeans.osiopso.repository.user.UserRepository;
import com.cojeans.osiopso.security.TokenProvider;
import com.cojeans.osiopso.security.UserDetail;
import com.cojeans.osiopso.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.json.HTTP;
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

    @GetMapping("")
    @Operation(summary = "회원조회")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        UserDetail userDetail = (UserDetail) authentication.getPrincipal();

        User user = userRepository.findById(userDetail.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userDetail.getId()));

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /*
    * 리턴타입 수정
    *
    * */
    @Operation(summary = "회원수정")
    @PutMapping("")
    public ResponseEntity<UserDto> EditUser(@RequestBody SignUpRequestDto signUpRequest) {
        log.info("signUpRequest: {}",signUpRequest);
        UserDto userDto = userService.editUser(signUpRequest).toDto();

        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
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

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponseDto(token));
    }


    @Operation(summary = "회원가입")
    @PostMapping("/signUp")
    public ResponseEntity<ApiResponseDto> registerUser(@RequestBody SignUpRequestDto signUpRequest) {
        log.info("signUpRequest: {}",signUpRequest);

        userService.saveUser(signUpRequest);

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






}





