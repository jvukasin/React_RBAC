package com.master.backend.dto;

import com.master.backend.model.RActions;

public class RActionsDTO {

    private long id;
    private String actionUrl;
    private String action;
    private String pageTitle;

    public RActionsDTO(long id, String actionUrl, String action, String pageTitle) {
        this.id = id;
        this.actionUrl = actionUrl;
        this.action = action;
        this.pageTitle = pageTitle;
    }

    public RActionsDTO(RActions a) {
        this(a.getId(), a.getActionUrl(), a.getAction(), a.getPageTitle());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getActionUrl() {
        return actionUrl;
    }

    public void setActionUrl(String actionUrl) {
        this.actionUrl = actionUrl;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getPageTitle() {
        return pageTitle;
    }

    public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }
}
