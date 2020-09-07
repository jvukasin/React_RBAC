package com.master.backend.dto;

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
    private List<RPagesDTO> children;

    public RPagesDTO(long id, String url, String title, String icon, String component, List<RActionsDTO> actions, List<RPagesDTO> children) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.icon = icon;
        this.component = component;
        this.actions = actions;
        this.children = children;
    }

    public RPagesDTO(RPages p) {
        this.id = p.getId();
        this.url = p.getUrl();
        this.title = p.getTitle();
        this.icon = p.getIcon();
        this.component = p.getComponent();
        this.children = transformChildrenToDTO(p.getChildren());
    }

    private List<RPagesDTO> transformChildrenToDTO(List<RPages> children) {
        ArrayList<RPagesDTO> ret = new ArrayList<>();
        for(RPages page : children) {
            RPagesDTO dto = new RPagesDTO(page);
            dto.setActions(new ArrayList<>());
            ret.add(dto);
        }
        return ret;
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

    public List<RPagesDTO> getChildren() {
        return children;
    }

    public void setChildren(List<RPagesDTO> children) {
        this.children = children;
    }
}
