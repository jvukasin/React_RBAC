package com.master.backend.model;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "react_pages")
public class RPages {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "icon", nullable = false)
    private String icon;

    @Column(name = "component", nullable = false)
    private String component;

    @ManyToMany(fetch = FetchType.EAGER,  cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "pages_actions",
            joinColumns = @JoinColumn(
                    name = "react_pages_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "react_actions_id", referencedColumnName = "id"))
    private Collection<RActions> actions;

    @ManyToMany(mappedBy = "pages", fetch = FetchType.LAZY)
    private Collection<Role> roles;

    public RPages() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public Collection<RActions> getActions() {
        return actions;
    }

    public void setActions(Collection<RActions> actions) {
        this.actions = actions;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }
}
