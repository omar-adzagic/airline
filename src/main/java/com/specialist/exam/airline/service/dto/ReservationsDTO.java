package com.specialist.exam.airline.service.dto;

import com.specialist.exam.airline.domain.Flight;
import com.specialist.exam.airline.domain.User;

import java.time.Instant;
import java.util.List;

public class ReservationsDTO {
    private Long id;
    private Instant time;
    private User user;
    private Flight flight;

    public ReservationsDTO(Long id, Instant time, User user, Flight flight) {
        this.id = id;
        this.time = time;
        this.user = user;
        this.flight = flight;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTime() {
        return time;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }
}
