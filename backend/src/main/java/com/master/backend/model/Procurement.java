package com.master.backend.model;

import com.master.backend.enums.Enums;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "procurement")
public class Procurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "time_created", nullable = false)
    private LocalDateTime timeCreated;

    @Column(name = "time_finished", nullable = true)
    private LocalDateTime timeFinished;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private Enums.ProcurementStatus status;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private User seller;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private User procurer;

    @OneToMany(mappedBy = "procurement", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ProcurementItem> procurementItems;

    public Procurement() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getTimeCreated() {
        return timeCreated;
    }

    public void setTimeCreated(LocalDateTime timeCreated) {
        this.timeCreated = timeCreated;
    }

    public LocalDateTime getTimeFinished() {
        return timeFinished;
    }

    public void setTimeFinished(LocalDateTime timeFinished) {
        this.timeFinished = timeFinished;
    }

    public Enums.ProcurementStatus getStatus() {
        return status;
    }

    public void setStatus(Enums.ProcurementStatus status) {
        this.status = status;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public User getProcurer() {
        return procurer;
    }

    public void setProcurer(User procurer) {
        this.procurer = procurer;
    }

    public Set<ProcurementItem> getProcurementItems() {
        return procurementItems;
    }

    public void setProcurementItems(Set<ProcurementItem> procurementItems) {
        this.procurementItems = procurementItems;
    }
}
