package com.cojeans.osiopso.service.user;

import com.cojeans.osiopso.dto.user.SignUpRequestDto;
import com.cojeans.osiopso.dto.user.UserDto;
import com.cojeans.osiopso.entity.user.AuthProvider;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.user.UserRepository;
import com.cojeans.osiopso.security.TokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Slf4j
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
        User result = userRepository.save(User.builder()
                        .name(signUpRequest.getName())
                        .email(signUpRequest.getEmail())
                        .password(passwordEncoder.encode(signUpRequest.getPassword()))
                        .age(signUpRequest.getAge())
                        .gender(signUpRequest.getGender())
                        .provider(AuthProvider.local)
                        .imageUrl(signUpRequest.getImageUrl())
                        .emailVerified(false)
                        .build()
        );
        log.info("result : {}", result);

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

    @Transactional
    public User editUser(SignUpRequestDto signUpRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(signUpRequest.getEmail());
        UserDto userDto = optionalUser.get().toDto();

        if(StringUtils.isNotBlank(signUpRequest.getName())) userDto.setName(signUpRequest.getName());
        if(signUpRequest.getAge()!=0) userDto.setAge(signUpRequest.getAge());
        if(signUpRequest.getGender()!=null) userDto.setGender(signUpRequest.getGender());
        if(signUpRequest.getImageUrl()!=null) userDto.setImageUrl(signUpRequest.getImageUrl());

        return userRepository.save(User.builder()
                        .id(userDto.getId())
                        .email(userDto.getEmail())
                        .name(userDto.getName())
                        .password(userDto.getPassword())
                        .gender(userDto.getGender())
                        .imageUrl(userDto.getImageUrl())
                        .provider(userDto.getProvider())
                        .providerId(userDto.getProviderId())
                        .emailVerified(userDto.getEmailVerified())
                .build());
    }
}
