package com.master.backend.controller;

import com.master.backend.dto.RPagesDTO;
import com.master.backend.dto.TempDTO;
import com.master.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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

}
