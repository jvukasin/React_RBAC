package com.master.backend.model;

import javax.persistence.*;
import java.util.List;

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

    @ManyToMany(mappedBy = "pages", fetch = FetchType.LAZY)
    private List<Role> roles;

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

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

}
