package com.master.backend.dto;

public class InventoryDTO {

    private long id;
    private int quantity;
    private ArticleDTO article;

    public InventoryDTO(long id, int quantity, ArticleDTO articleDTO) {
        this.id = id;
        this.quantity = quantity;
        this.article = articleDTO;
    }

    public InventoryDTO() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public ArticleDTO getArticleDTO() {
        return article;
    }

    public void setArticleDTO(ArticleDTO articleDTO) {
        this.article = articleDTO;
    }
}
