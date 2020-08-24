package com.master.backend.service;

import com.master.backend.dto.*;
import com.master.backend.model.RActions;
import com.master.backend.model.RPages;
import com.master.backend.model.Role;
import com.master.backend.model.User;
import com.master.backend.repository.RoleRepository;
import com.master.backend.repository.UserRepository;
import com.master.backend.security.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
public class UserService {

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    public List<RPagesDTO> getRoutes(HttpServletRequest request) {
        String username = getUsernameFromRequest(request);
        User user = userRepository.findOneByUsername(username);
        if(user != null) {
            List<Role> roles = user.getRoles();
            Set<RPagesDTO> pages = new LinkedHashSet();
            Set<RActionsDTO> actions = new LinkedHashSet();
            ArrayList<RPages> checkPage = new ArrayList<>();
            ArrayList<RActions> checkActions = new ArrayList<>();

            //get unique pages and actions for all roles
            for(Role r : roles) {
                List<RPages> rolePages = r.getPages();
                List<RActions> roleActions = r.getActions();
                for(RPages p : rolePages) {
                    RPagesDTO one = new RPagesDTO(p);
                    one.setActions(new ArrayList<>());
                    if(!checkPage.contains(p)) {
                        checkPage.add(p);
                        pages.add(one);
                    }
                }
                for(RActions a : roleActions) {
                    RActionsDTO one = new RActionsDTO(a);
                    if(!checkActions.contains(one)) {
                        checkActions.add(a);
                        actions.add(one);
                    }
                }
            }

            //add actions to pages
            for(RPagesDTO page : pages) {
                for(RActionsDTO action : actions) {
                    if(action.getPageTitle().equals(page.getTitle())) {
                        page.getActions().add(action);
                    }
                }
            }

            return new ArrayList<>(pages);
        }
        return null;
    }

    public String getCurrentUser(HttpServletRequest request) {
        String username = getUsernameFromRequest(request);
        if(username == null) {
            return "none";
        }
        return username;
    }

    public boolean isUserLogged(HttpServletRequest request) {
        String username = getUsernameFromRequest(request);
        if(username == null || username == "") {
            return false;
        }
        return true;
    }

    public String getUsernameFromRequest(HttpServletRequest request) {
        String authToken = tokenUtils.getToken(request);
        if (authToken == null) {
            return null;
        }
        String username = tokenUtils.getUsernameFromToken(authToken);
        return username;
    }

    public User getUserFromRequest(HttpServletRequest request) {
        String username = getUsernameFromRequest(request);
        return userRepository.findOneByUsername(username);
    }

    public UserInfoDTO getUser(HttpServletRequest request) {
        User user = getUserFromRequest(request);
        String name = user.getFirstName().concat(" ").concat(user.getLastName());
        String roles = getRoles(user.getRoles());

        return new UserInfoDTO(user.getUsername(), name, user.getEmail(), user.getWorkerCode(), roles);
    }

    private String getStringNameFromRole(Role r) {
        if(r.getName().equals("ROLE_SELLER")) {
            return "Seller";
        } else if(r.getName().equals("ROLE_PROCURER")) {
            return "Procurer";
        }
        else return "Admin";
    }

    public List<UserInfoDTO> getAllUsers(HttpServletRequest request) {
        String admin = getUsernameFromRequest(request);
        List<User> users = userRepository.findAll();
        List<UserInfoDTO> ret = new ArrayList<>();
        for(User u : users) {
            if(!u.getUsername().equals(admin)) {
                String name = u.getFirstName().concat(" ").concat(u.getLastName());
                String roles = getRoles(u.getRoles());
                ret.add(new UserInfoDTO(u.getUsername(), name, u.getEmail(), u.getWorkerCode(), roles));
            }
        }
        return ret;
    }

    private String getRoles(List<Role> roleList) {
        String roles = getStringNameFromRole(roleList.get(0));
        int size = roleList.size();
        if(size > 1) {
            for(int i=1; i<size; i++) {
                String temp = getStringNameFromRole(roleList.get(i));
                roles = roles + ", " + temp;
            }
        }
        return roles;
    }

    public List<RoleDTO> getRoles() {
        List<RoleDTO> ret = new ArrayList<>();
        List<Role> roles = roleRepository.findAll();
        for(Role r : roles) {
            RoleDTO dto = new RoleDTO(r.getId(), r.getName());
            ret.add(dto);
        }
        return ret;
    }

    public UserInfoDTO createUser(UserDTO newUser) {
        User exists = userRepository.findOneByUsername(newUser.getUsername());

        if(exists != null) {
            return null;
        }

        User user = new User();
        user.setEmail(newUser.getEmail());
        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());
        user.setUsername(newUser.getUsername());
        String salt = BCrypt.gensalt();
        String hashedPass = BCrypt.hashpw(newUser.getPassword(), salt);
        user.setPassword(hashedPass);
        user.setWorkerCode(newUser.getWorkerCode());

        List<Role> userRoles = new ArrayList<>();
        for(String roleId : newUser.getRoles()) {
            Role r = roleRepository.findOneById(Long.parseLong(roleId));
            userRoles.add(r);
        }
        user.setRoles(userRoles);

        user = userRepository.save(user);

        String name = user.getFirstName().concat(" ").concat(user.getLastName());
        String roles = getRoles(user.getRoles());
        return new UserInfoDTO(user.getUsername(), name, user.getEmail(), user.getWorkerCode(), roles);
    }
}
