package com.master.backend.dto;

import com.master.backend.enums.Enums;
import java.util.Set;

public class ProcurementDTO {

    private long id;
    private String timeCreated;
    private String timeFinished;
    private Enums.ProcurementStatus status;
    private String seller;
    private String procurer;
    private Set<ProcurementItemDTO> procurementItems;

    public ProcurementDTO(long id, String timeCreated, String timeFinished, Enums.ProcurementStatus status, String seller, String procurer, Set<ProcurementItemDTO> procurementItems) {
        this.id = id;
        this.timeCreated = timeCreated;
        this.timeFinished = timeFinished;
        this.status = status;
        this.seller = seller;
        this.procurer = procurer;
        this.procurementItems = procurementItems;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTimeCreated() {
        return timeCreated;
    }

    public void setTimeCreated(String timeCreated) {
        this.timeCreated = timeCreated;
    }

    public String getTimeFinished() {
        return timeFinished;
    }

    public void setTimeFinished(String timeFinished) {
        this.timeFinished = timeFinished;
    }

    public Enums.ProcurementStatus getStatus() {
        return status;
    }

    public void setStatus(Enums.ProcurementStatus status) {
        this.status = status;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public String getProcurer() {
        return procurer;
    }

    public void setProcurer(String procurer) {
        this.procurer = procurer;
    }

    public Set<ProcurementItemDTO> getProcurementItems() {
        return procurementItems;
    }

    public void setProcurementItems(Set<ProcurementItemDTO> procurementItems) {
        this.procurementItems = procurementItems;
    }
}
