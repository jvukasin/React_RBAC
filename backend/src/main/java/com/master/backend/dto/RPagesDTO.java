package com.master.backend.dto;

import com.master.backend.model.RActions;
import com.master.backend.model.RPages;

import java.util.ArrayList;
import java.util.List;

public class RPagesDTO {
    private long id;
    private String url;
    private String title;
    private String icon;
    private String component;
    private List<RActionsDTO> actions;

    public RPagesDTO(long id, String url, String title, String icon, String component, List<RActionsDTO> actions) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.icon = icon;
        this.component = component;
        this.actions = actions;
    }

    public RPagesDTO(RPages p) {
        this.id = p.getId();
        this.url = p.getUrl();
        this.title = p.getTitle();
        this.icon = p.getIcon();
        this.component = p.getComponent();;
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

    public List<RActionsDTO> getActions() {
        return actions;
    }

    public void setActions(List<RActionsDTO> actions) {
        this.actions = actions;
    }
}
