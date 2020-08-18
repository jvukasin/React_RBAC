package com.master.backend.service;

import com.master.backend.model.User;
import com.master.backend.model.UserTokenState;
import com.master.backend.security.CustomUserDetailsService;
import com.master.backend.security.TokenUtils;
import com.master.backend.security.auth.JwtAuthenticationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class AuthService {

    @Autowired
    public TokenUtils tokenUtils;

    @Autowired
    public AuthenticationManager manager;

    @Autowired
    public CustomUserDetailsService userDetailsService;

    public UserTokenState login(JwtAuthenticationRequest authenticationRequest, HttpServletResponse response, Device device, HttpServletRequest hr) {

        final Authentication authentication = manager
                .authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));

        User user =  (User) authentication.getPrincipal();
        // VRATI DRUGI STATUS KOD
        if(user == null) {
            return null;
        }

        String jwt = tokenUtils.generateToken(user.getUsername(), device);
        int expiresIn = 3600;

        return new UserTokenState(jwt,expiresIn);
    }

    public boolean logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
            return true;
        }
        return false;
    }
}
