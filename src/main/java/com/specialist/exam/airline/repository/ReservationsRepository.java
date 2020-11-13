package com.specialist.exam.airline.repository;

import com.specialist.exam.airline.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationsRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r") // WHERE r.userId = 1
    List<Reservation> getMyReservations();
}
