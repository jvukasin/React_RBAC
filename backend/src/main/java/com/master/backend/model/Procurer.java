package com.master.backend.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@DiscriminatorValue("Procurer")
public class Procurer extends User {

    @OneToMany(mappedBy = "procurer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Procurement> procurements;
}
