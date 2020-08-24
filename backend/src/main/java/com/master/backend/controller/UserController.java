package com.master.backend.controller;

import com.master.backend.dto.*;
import com.master.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/routes", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RPagesDTO>> getRoutes(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getRoutes(request), HttpStatus.OK);
    }

    @RequestMapping(value = "/isUserLogged", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> isUserLogged(HttpServletRequest request) {
        return new ResponseEntity<>(userService.isUserLogged(request), HttpStatus.OK);
    }

    @RequestMapping(value = "/currentUser", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> currentUser(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getCurrentUser(request), HttpStatus.OK);
    }

    @RequestMapping(value = "/getUser", method = RequestMethod.GET)
    public ResponseEntity<UserInfoDTO> getUser(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getUser(request), HttpStatus.OK);
    }

    @RequestMapping(value = "/getAllUsers", method = RequestMethod.GET)
    public ResponseEntity<List<UserInfoDTO>> getAllUsers(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getAllUsers(request), HttpStatus.OK);
    }

    @RequestMapping(value = "/getRoles", method = RequestMethod.GET)
    public ResponseEntity<List<RoleDTO>> getRoles() {
        return new ResponseEntity<>(userService.getRoles(), HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<UserInfoDTO> createUser(@RequestBody UserDTO newUser) {
        UserInfoDTO ret = userService.createUser(newUser);
        if(ret == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(ret, HttpStatus.CREATED);
    }

}
