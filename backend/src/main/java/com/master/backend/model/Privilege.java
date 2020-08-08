package com.master.backend.model;

import javax.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

@Entity
public class Privilege implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "privileges", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Collection<Role> roles;

    @Override
    public String getAuthority() {
        return null;
    }
}
