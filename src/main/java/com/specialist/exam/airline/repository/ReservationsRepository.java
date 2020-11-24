package com.specialist.exam.airline.repository;

import com.specialist.exam.airline.domain.Reservation;
import com.specialist.exam.airline.service.dto.ReservationsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReservationsRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r WHERE r.user.id = ?1")
    List<Reservation> getMyReservations(Long userId);

    @Query("SELECT new com.specialist.exam.airline.service.dto.ReservationsDTO(r.id, r.time, r.user, r.flight) FROM Reservation r")
    List<ReservationsDTO> getReservations();

    @Query("SELECT COUNT(r.id) AS count FROM Reservation r WHERE DAY(r.time) = DAY(CURRENT_DATE) AND r.canceled = false")
    List<?> getReservationsDayWithCanceled();

    @Query("SELECT COUNT(r.id) AS count FROM Reservation r WHERE DAY(r.time) = DAY(CURRENT_DATE)")
    List<?> getReservationsDay();

    @Query("SELECT COUNT(r.id) AS count FROM Reservation r WHERE MONTH(r.time) = MONTH(CURRENT_DATE) AND r.canceled = false")
    List<?> getReservationsMonthWithCanceled();

    @Query("SELECT COUNT(r.id) AS count FROM Reservation r WHERE MONTH(r.time) = MONTH(CURRENT_DATE)")
    List<?> getReservationsMonth();

    @Query("SELECT COUNT(r.id) AS count FROM Reservation r WHERE YEAR(r.time) = YEAR(CURRENT_DATE) AND r.canceled = false")
    List<?> getReservationsYearWithCanceled();

    @Query("SELECT COUNT(r.id) AS count FROM Reservation r WHERE YEAR(r.time) = YEAR(CURRENT_DATE)")
    List<?> getReservationsYear();

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.flight.id = ?1")
    Integer getFlightReservationsCount(Long id);
}
