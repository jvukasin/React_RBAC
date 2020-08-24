package com.master.backend.dto;

public class UserInfoDTO {

    private String username;
    private String name;
    private String email;
    private String workerCode;
    private String roles;

    public UserInfoDTO() {
    }

    public UserInfoDTO(String username, String name, String email, String workerCode, String roles) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.workerCode = workerCode;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWorkerCode() {
        return workerCode;
    }

    public void setWorkerCode(String workerCode) {
        this.workerCode = workerCode;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
