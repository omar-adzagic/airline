package com.specialist.exam.airline.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "flights")
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "flight_date")
    @NotNull
    private LocalDate flightDate;
    @Column(name = "return_date")
    @NotNull
    private LocalDate returnDate;
    @Column(name = "city_from")
    @NotNull
    private String cityFrom;
    @Column(name = "city_to")
    @NotNull
    private String cityTo;
    @Column(name = "boarding_time")
    @NotNull
    private Instant boardingTime;
    @Column(name = "boarding_time_return")
    @NotNull
    private Instant boardingTimeReturn;
    @Column(name = "price")
    @NotNull
    private Integer price;
    @Column(name = "active")
    @NotNull
    private boolean active;

    // Relationships
    @ManyToOne
    @JoinColumn(name = "airplane_id")
    private Airplane airplane;
    @OneToMany(mappedBy = "flight")
    private List<Reservation> reservations;

    public Flight() {}

    public Flight(LocalDate flightDate, LocalDate returnDate, String cityFrom, String cityTo, Instant boardingTime, Instant boardingTimeReturn, Integer price, boolean active, Airplane airplane) {
        this.flightDate = flightDate;
        this.returnDate = returnDate;
        this.cityFrom = cityFrom;
        this.cityTo = cityTo;
        this.boardingTime = boardingTime;
        this.boardingTimeReturn = boardingTimeReturn;
        this.price = price;
        this.active = active;
        this.airplane = airplane;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFlightDate() {
        return flightDate;
    }

    public void setFlightDate(LocalDate flightDate) {
        this.flightDate = flightDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public String getCityFrom() {
        return cityFrom;
    }

    public void setCityFrom(String cityFrom) {
        this.cityFrom = cityFrom;
    }

    public String getCityTo() {
        return cityTo;
    }

    public void setCityTo(String cityTo) {
        this.cityTo = cityTo;
    }

    public Instant getBoardingTime() {
        return boardingTime;
    }

    public void setBoardingTime(Instant boardingTime) {
        this.boardingTime = boardingTime;
    }

    public Instant getBoardingTimeReturn() {
        return boardingTimeReturn;
    }

    public void setBoardingTimeReturn(Instant boardingTimeReturn) {
        this.boardingTimeReturn = boardingTimeReturn;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Airplane getAirplane() {
        return airplane;
    }

    public void setAirplane(Airplane airplane) {
        this.airplane = airplane;
    }
}
