package com.specialist.exam.airline.web.rest;

import com.specialist.exam.airline.domain.AuthenticationResponse;
import com.specialist.exam.airline.security.JwtUtil;
import com.specialist.exam.airline.security.MyUserDetailsService;
import com.specialist.exam.airline.domain.AuthenticationRequest;
import com.specialist.exam.airline.repository.UserRepository;
import com.specialist.exam.airline.service.UsersService;
import com.specialist.exam.airline.service.dto.BasicUserInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AccountResource {

    private final AuthenticationManager authenticationManager;
    private final MyUserDetailsService userDetailsService;
    private final JwtUtil jwtTokenUtil;
    private final UsersService usersService;

    public AccountResource(AuthenticationManager authenticationManager, MyUserDetailsService userDetailsService, JwtUtil jwtTokenUtil, UsersService usersService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.usersService = usersService;
    }

    //    @GetMapping("/")
//    public String home() {
//        return ("<h1>Welcome</h1>");
//    }
//
//    @GetMapping("/login")
//    public void login() {
//
//    }

    @PostMapping("/authenticate")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
        BasicUserInfoDTO basicUserInfoDTO = usersService.getBasicUserInfo(authenticationRequest.getUsername());
        String jwt = jwtTokenUtil.generateToken(authenticationRequest.getUsername());
        return new AuthenticationResponse(jwt, basicUserInfoDTO);
    }
}
