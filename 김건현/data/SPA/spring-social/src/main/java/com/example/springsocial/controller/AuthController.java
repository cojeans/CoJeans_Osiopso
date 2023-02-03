//package com.example.springsocial.controller;
//
//import com.example.springsocial.exception.BadRequestException;
//import com.example.springsocial.entity.AuthProvider;
//import com.example.springsocial.entity.User;
//import com.example.springsocial.dto.ApiResponse;
//import com.example.springsocial.dto.AuthResponse;
//import com.example.springsocial.dto.LoginRequest;
//import com.example.springsocial.dto.SignUpRequest;
//import com.example.springsocial.repository.UserRepository;
//import com.example.springsocial.security.TokenProvider;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//
//import javax.validation.Valid;
//import java.net.URI;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private TokenProvider tokenProvider;
//
//    @PostMapping("/signIn")
//    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
//
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        loginRequest.getEmail(),
//                        loginRequest.getPassword()
//                )
//        );
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        String token = tokenProvider.createToken(authentication);
//        return ResponseEntity.ok(new AuthResponse(token));
//    }
//
//    /**
//     *
//     * @param signUpRequest
//     * @return
//     */
//    @PostMapping("/signUp")
//    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
//        //중복된 Email로 등록을하면
//        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
//            throw new BadRequestException("이미 사용중인 Email입니다.");
//        }
//
//        // Creating user's account
//        User user = new User();
//        user.setName(signUpRequest.getName());
//        user.setEmail(signUpRequest.getEmail());
//        user.setPassword(signUpRequest.getPassword());
//        user.setProvider(AuthProvider.local);
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        User result = userRepository.save(user);
//
//
//
//        /*URI location = ServletUriComponentsBuilder
//                .fromCurrentContextPath().path("/user/me")
//                .buildAndExpand(result.getId()).toUri();
//
//
//        return ResponseEntity.created(location)
//                .body(new ApiResponse(true, "User registered successfully@"));*/
//
//        return new ResponseEntity(new ApiResponse(true, "User registered successfully@"), HttpStatus.CREATED);
//    }
//
//}
