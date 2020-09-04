package com.master.backend.dto;

public class StatsDTO {

    private long noOfItems;
    private long noOfEmployees;
    private long orderedProcurements;
    private long completedProcurements;

    public StatsDTO() {
    }

    public StatsDTO(long noOfItems, long noOfEmployees, long orderedProcurements, long completedProcurements) {
        this.noOfItems = noOfItems;
        this.noOfEmployees = noOfEmployees;
        this.orderedProcurements = orderedProcurements;
        this.completedProcurements = completedProcurements;
    }

    public long getNoOfItems() {
        return noOfItems;
    }

    public void setNoOfItems(long noOfItems) {
        this.noOfItems = noOfItems;
    }

    public long getNoOfEmployees() {
        return noOfEmployees;
    }

    public void setNoOfEmployees(long noOfEmployees) {
        this.noOfEmployees = noOfEmployees;
    }

    public long getOrderedProcurements() {
        return orderedProcurements;
    }

    public void setOrderedProcurements(long orderedProcurements) {
        this.orderedProcurements = orderedProcurements;
    }

    public long getCompletedProcurements() {
        return completedProcurements;
    }

    public void setCompletedProcurements(long completedProcurements) {
        this.completedProcurements = completedProcurements;
    }
}
