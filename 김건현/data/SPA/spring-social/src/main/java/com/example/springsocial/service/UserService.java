package com.example.springsocial.service;

import com.example.springsocial.dto.SignUpRequest;
import com.example.springsocial.entity.AuthProvider;
import com.example.springsocial.entity.User;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    public User saveUser(SignUpRequest signUpRequest){
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User result = userRepository.save(user);

        return result;
    }

}
