package com.master.backend.security;

import com.master.backend.model.User;
import com.master.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;


    @Override
    public UserDetails loadUserByUsername(String usr) throws UsernameNotFoundException {
        User user =  userRepo.findOneByUsername(usr);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", usr));
        } else {
            return user;
        }
    }
}