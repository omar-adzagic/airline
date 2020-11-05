package com.specialist.exam.airline.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "reservation_class")
    @NotNull
    private String reservationClass;
    @Column(name = "time")
    @NotNull
    private Instant time;

    // Relationships
    @JoinColumn(name = "user_id")
    @ManyToOne // fetch = FetchType.LAZY
    private User user;
    @ManyToOne // fetch = FetchType.LAZY
    @JoinColumn(name = "flight_id")
    private Flight flight;

    public Reservation(@NotNull String reservationClass, @NotNull Instant time, User user, Flight flight) {
        this.reservationClass = reservationClass;
        this.time = time;
        this.user = user;
        this.flight = flight;
    }

    public Reservation() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReservationClass() {
        return reservationClass;
    }

    public void setReservationClass(String reservationClass) {
        this.reservationClass = reservationClass;
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
