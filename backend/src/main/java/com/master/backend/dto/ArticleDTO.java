package com.master.backend.dto;

import com.master.backend.model.Artical;

public class ArticleDTO {

    private long id;
    private String name;
    private String code;
    private String brand;
    private double price;

    public ArticleDTO() {
    }

    public ArticleDTO(long id, String name, String code, String brand, double price) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.brand = brand;
        this.price = price;
    }

    public ArticleDTO(Artical a) {
        this(a.getId(), a.getName(), a.getCode(), a.getBrand(), a.getPrice());
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
