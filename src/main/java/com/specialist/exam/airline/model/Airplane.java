package com.specialist.exam.airline.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "airplanes")
public class Airplane {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "model")
    @NotNull
    private String model;
    @Column(name = "capacity")
    @NotNull
    // @Size(max=500)
    private int capacity;
    @Column(name = "year")
    @NotNull
    // @Size(min=1)
    private int year;
    @Column(name = "active")
    private boolean active;

    // Relationships
    @OneToMany(mappedBy = "airplane")
    private List<Flight> flights;

    public Airplane(String model, int capacity, int year, boolean active) {
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
}
