package com.cojeans.osiopso.service.user;

import com.cojeans.osiopso.dto.user.SignUpRequestDto;
import com.cojeans.osiopso.entity.user.AuthProvider;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.user.UserRepository;
import com.cojeans.osiopso.security.TokenProvider;
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

    public User saveUser(SignUpRequestDto signUpRequest){
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User result = userRepository.save(user);

        return result;
    }

    //비밀번호 일치 체크
    public boolean isPasswordMatch(String inputPassword,String dataBasePassword) {
        return passwordEncoder.matches(inputPassword,dataBasePassword);
    }

    public boolean isEmailExist(String email) {
        //중복된 Email로 등록을하면
        if(userRepository.existsByEmail(email)) {
            return true;
        }
        return false;
    }

    public User updateUser(SignUpRequestDto signUpRequest) {
        User user = userRepository.findByEmail(signUpRequest.getEmail()).orElse(null);
        if (user != null) {
            user.setName(signUpRequest.getName());
            user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        }
        return userRepository.save(user);
    }
}
