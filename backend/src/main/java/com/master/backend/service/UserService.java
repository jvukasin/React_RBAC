package com.master.backend.service;

import com.master.backend.dto.RActionsDTO;
import com.master.backend.dto.RPagesDTO;
import com.master.backend.model.RActions;
import com.master.backend.model.RPages;
import com.master.backend.model.Role;
import com.master.backend.model.User;
import com.master.backend.repository.UserRepository;
import com.master.backend.security.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private UserRepository userRepository;

    public List<RPagesDTO> getRoutes(HttpServletRequest request) {
        String username = getUsernameFromRequest(request);
        User user = userRepository.findOneByUsername(username);
        if(user != null) {
            List<Role> roles = user.getRoles();
            Set<RPagesDTO> pages = new LinkedHashSet();
            Set<RActionsDTO> actions = new LinkedHashSet();

            //get unique pages and actions for all roles
            for(Role r : roles) {
                List<RPages> rolePages = r.getPages();
                List<RActions> roleActions = r.getActions();
                for(RPages p : rolePages) {
                    RPagesDTO one = new RPagesDTO(p);
                    one.setActions(new ArrayList<>());
                    pages.add(one);
                }
                for(RActions a : roleActions) {
                    RActionsDTO one = new RActionsDTO(a);
                    actions.add(one);
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
}
