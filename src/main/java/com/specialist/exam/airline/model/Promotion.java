package com.specialist.exam.airline.model;

import javax.persistence.*;

@Entity
@Table(name = "promotions")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Relationships
    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;

    public Promotion(Flight flight) {
        this.flight = flight;
    }

    public Promotion() {}

    public Long getId() {
        return id;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }
}
