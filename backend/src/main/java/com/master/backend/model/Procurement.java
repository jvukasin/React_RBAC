package com.master.backend.model;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "procurement")
public class Procurement {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "time_created", nullable = false)
    private Date timeCreated;

    @Column(name = "time_finished", nullable = false)
    private Date timeFinished;

    @Column(name = "is_finished", nullable = false)
    private boolean finished;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Seller seller;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Procurer procurer;

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

    public Date getTimeCreated() {
        return timeCreated;
    }

    public void setTimeCreated(Date timeCreated) {
        this.timeCreated = timeCreated;
    }

    public Date getTimeFinished() {
        return timeFinished;
    }

    public void setTimeFinished(Date timeFinished) {
        this.timeFinished = timeFinished;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    public Procurer getProcurer() {
        return procurer;
    }

    public void setProcurer(Procurer procurer) {
        this.procurer = procurer;
    }

    public Set<ProcurementItem> getProcurementItems() {
        return procurementItems;
    }

    public void setProcurementItems(Set<ProcurementItem> procurementItems) {
        this.procurementItems = procurementItems;
    }
}
