package com.master.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "ttemp")
public class Temp {

    @Id
    private long id;

    @Column
    private String name;

    public Temp() {

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
