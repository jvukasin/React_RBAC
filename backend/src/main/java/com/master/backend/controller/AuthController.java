package com.master.backend.controller;

import com.master.backend.model.User;
import com.master.backend.model.UserTokenState;
import com.master.backend.security.CustomUserDetailsService;
import com.master.backend.security.TokenUtils;
import com.master.backend.security.auth.JwtAuthenticationRequest;
import com.master.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    @Autowired
    AuthService authService;


    @RequestMapping(value="/login",method = RequestMethod.POST)
    public ResponseEntity<UserTokenState> loginUser(@RequestBody JwtAuthenticationRequest authenticationRequest, HttpServletResponse response, Device device, HttpServletRequest hr){

        UserTokenState uts = authService.login(authenticationRequest, response, device, hr);
        if(uts == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(uts);
    }

    @RequestMapping(value="/logout", method = RequestMethod.POST)
    public ResponseEntity<?> logOut(HttpServletRequest request, HttpServletResponse response){

        if(authService.logout(request, response)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}