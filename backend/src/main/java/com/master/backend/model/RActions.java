package com.master.backend.model;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "react_actions")
public class RActions {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "url", nullable = false)
    private String actionUrl;

    @Column(name = "action", nullable = false)
    private String action;

    @ManyToMany(mappedBy = "actions", fetch = FetchType.LAZY)
    private Collection<RPages> pages;
}
