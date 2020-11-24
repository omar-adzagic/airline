package com.specialist.exam.airline.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "airplanes")
public class Airplane {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "model")
    @NotEmpty(message = "Model je neophodan za unos.")
    private String model;
    @Column(name = "capacity")
    @NotNull(message = "Kapacitet je neophodan za unos.")
    @Min(value = 1, message="Minimalna vrijednost za kapacitet je 1.")
    private int capacity;
    @Column(name = "year")
    @Min(value = 1914, message="Minimalna vrijednost za godinu je 1914.")
    @NotNull(message = "Godina je neophodna za unos")
    private int year;
    @Column(name = "active")
    private Boolean active;

    // Relationships
    @OneToMany(mappedBy = "airplane")
    @JsonIgnore
    private List<Flight> flights;

    public Airplane(String model, int capacity, int year, Boolean active) {
        this.model = model;
        this.capacity = capacity;
        this.year = year;
        this.active = active;
    }

    public Airplane() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public List<Flight> getFlights() {
        return flights;
    }

    public void setFlights(List<Flight> flights) {
        this.flights = flights;
    }
}
