package com.cojeans.osiopso.controller;

import com.cojeans.osiopso.dto.ApiResponse;
import com.cojeans.osiopso.dto.user.AuthResponse;
import com.cojeans.osiopso.dto.user.LoginRequest;
import com.cojeans.osiopso.dto.user.SignUpRequest;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.exception.BadRequestException;
import com.cojeans.osiopso.exception.ResourceNotFoundException;
import com.cojeans.osiopso.repository.user.UserRepository;
import com.cojeans.osiopso.security.TokenProvider;
import com.cojeans.osiopso.security.UserDetail;
import com.cojeans.osiopso.service.user.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

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

//    @GetMapping("")
//    @PreAuthorize("hasRole('USER')")
//    public User getCurrentUser(@CurrentUser UserDetail userDetail) {
//        return userRepository.findById(userDetail.getId())
//                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userDetail.getId()));
//    }
    @GetMapping("")
    @ApiOperation(value = "회원조회")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(Authentication authentication) {
        UserDetail userDetail = (UserDetail) authentication.getPrincipal();

        return userRepository.findById(userDetail.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userDetail.getId()));
    }

    /*
    * 아직 에러. 수정할것.
    *
    * */
    @ApiOperation(value = "회원수정")
    @PatchMapping("")
    @PreAuthorize("hasRole('USER')")
    public User modifyCurrentUser(SignUpRequest signUpRequest) {
        User user = userRepository.findByEmail(signUpRequest.getEmail()).orElse(null);
        log.info(signUpRequest.getEmail());
        if (user != null) {
            user.setName(signUpRequest.getName());
            user.setPassword(signUpRequest.getPassword());
        }
        userRepository.save(user);
        return user;
    }


    @ApiOperation(value = "로그인")
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));
    }


    @ApiOperation(value = "회원가입")
    @PostMapping("/signUp")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        //중복된 Email로 등록을하면
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("이미 사용중인 Email입니다.");
        }
        userService.saveUser(signUpRequest);

        return new ResponseEntity(new ApiResponse(true,
                "User registered successfully@"), HttpStatus.CREATED);
    }


}





