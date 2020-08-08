package com.master.backend.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@DiscriminatorValue("Seller")
public class Seller extends User {

    @OneToMany(mappedBy = "seller", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Procurement> procurements;
}
