package com.specialist.exam.airline.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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
    @NotNull(message = "Potrebno je izabrati datum polaska.")
    private LocalDate flightDate;
    @Column(name = "return_date")
//    @NotEmpty(message = "Potrebno je izabrati datum povratka.")
    private LocalDate returnDate;
    @Column(name = "city_from")
    @NotEmpty(message = "Mjesto polaska je neophodno za unos.")
    private String cityFrom;
    @Column(name = "city_to")
    @NotEmpty(message = "Destinacija je neophodna za unos.")
    private String cityTo;
    @Column(name = "boarding_time")
    @NotNull(message = "Potrebno je izabrati vrijeme ukrcavanja.")
    private Instant boardingTime;
    @Column(name = "boarding_time_return")
//    @NotNull(message = "Potrebno je izabrati povratno vrijeme ukrcavanja.")
    private Instant boardingTimeReturn;
    @Column(name = "price")
    @NotNull(message = "Cijena je neophodna za unos.")
    @Min(value = 0, message="Minimalna vrijednost za cijenu je 0.")
    private Integer price;
    @Column(name = "active")
    @NotNull
    private boolean active;
    @Column(name = "promoted")
    @NotNull
    private boolean promoted;

    // Relationships
    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "airplane_id")
    @NotNull(message = "Potrebno je izaberiti model aviona.")
    private Airplane airplane;
    @JsonBackReference
    @OneToMany(mappedBy = "flight")
    private List<Reservation> reservations;

    public Flight() {}

    public Flight(LocalDate flightDate, LocalDate returnDate, String cityFrom, String cityTo, Instant boardingTime, Instant boardingTimeReturn, Integer price, boolean active, boolean promoted, Airplane airplane) {
        this.flightDate = flightDate;
        this.returnDate = returnDate;
        this.cityFrom = cityFrom;
        this.cityTo = cityTo;
        this.boardingTime = boardingTime;
        this.boardingTimeReturn = boardingTimeReturn;
        this.price = price;
        this.active = active;
        this.promoted = promoted;
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

    public boolean isPromoted() {
        return promoted;
    }

    public void setPromoted(boolean promoted) {
        this.promoted = promoted;
    }

    public Airplane getAirplane() {
        return airplane;
    }

    public void setAirplane(Airplane airplane) {
        this.airplane = airplane;
    }
}
