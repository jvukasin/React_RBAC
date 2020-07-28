package com.master.backend.dto;

import com.master.backend.model.Temp;

public class TempDTO {

    private long id;
    private String name;

    public TempDTO() {
    }

    public TempDTO(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public TempDTO(Temp t) {
        this(t.getId(), t.getName());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
