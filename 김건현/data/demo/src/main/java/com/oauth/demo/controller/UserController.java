package com.oauth.demo.controller;

import com.oauth.demo.dto.SignupForm;
import com.oauth.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/*@Controller
public class UserController {
    @GetMapping(value = "/account/join")
    public String joinForm(User user, HttpSession session){
        user = (User)session.getAttribute("user");
        if(user != null && user.getRoleKey().contains("ROLE_USER")) {
            return "redirect:/";
        }
        return "join";
    }
}*/

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginSuccess(@RequestBody Map<String, String> loginForm) {
        String token = service.login(loginForm.get("username"), loginForm.get("password"));
        return ResponseEntity.ok(token);
    }

    @PostMapping("/signup")
    public Long signup(@RequestBody SignupForm signupForm) {
        return service.signup(signupForm);
    }

    @GetMapping("/signup/check/{email}/exists")
    public ResponseEntity<Boolean> checkEmailDuplicate(@PathVariable String email) {
        return ResponseEntity.ok(service.checkEmailExists(email));
    }

}
