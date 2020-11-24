package com.specialist.exam.airline.web.rest;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.specialist.exam.airline.domain.Reservation;
import com.specialist.exam.airline.repository.PromotionsRepository;
import com.specialist.exam.airline.repository.ReservationsRepository;
import com.specialist.exam.airline.service.ReservationsService;
import com.specialist.exam.airline.service.dto.ReservationsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ReservationsResource {
    @Autowired
    private ReservationsService reservationsService;
    @Autowired
    private ReservationsRepository reservationsRepository;

    @GetMapping("/reservations")
    public List<Reservation> getReservations() {
        return this.reservationsService.getReservations();
    }

    @GetMapping("/reservations/{userId}")
    public List<Reservation> getMyReservations(@PathVariable Long userId) {
        return this.reservationsService.getMyReservations(userId);
    }

    @GetMapping("/reservations/stats")
    public Map<String, String> getHomeData() {
        List<?> reservationsDayWithCanceled = this.reservationsRepository.getReservationsDayWithCanceled();
        List<?> reservationsDay = this.reservationsRepository.getReservationsDay();
        List<?> reservationsMonthWithCanceled = this.reservationsRepository.getReservationsMonthWithCanceled();
        List<?> reservationsMonth = this.reservationsRepository.getReservationsMonth();
        List<?> reservationsYearWithCanceled = this.reservationsRepository.getReservationsYearWithCanceled();
        List<?> reservationsYear = this.reservationsRepository.getReservationsYear();
        // String reservationsDay = reservation.getTime();
        Map<String, String> map = new HashMap<String, String>();
        map.put("todayWithCanceled", String.valueOf(reservationsDayWithCanceled.get(0)));
        map.put("today", String.valueOf(reservationsDay.get(0)));
        map.put("monthWithCanceled", String.valueOf(reservationsMonthWithCanceled.get(0)));
        map.put("month", String.valueOf(reservationsMonth.get(0)));
        map.put("yearWithCanceled", String.valueOf(reservationsYearWithCanceled.get(0)));
        map.put("year", String.valueOf(reservationsYear.get(0)));
        return map;
    }

    @PostMapping("/reservations")
    public Reservation storeReservation(@Valid @RequestBody Reservation newReservation) {
        return reservationsService.storeReservation(newReservation);
    }

    @PutMapping("/reservations/{id}/cancel")
    public ResponseEntity<Reservation> cancelReservation(@PathVariable Long id) {
        Optional<Reservation> optionalReservation = reservationsRepository.findById(id);
        Reservation reservation = optionalReservation.get();
        reservation.setCanceled(true);
        reservationsRepository.save(reservation);
        return ResponseEntity.ok(reservation);
    }

    @DeleteMapping("/reservations/{id}")
    public ResponseEntity deleteReservation(@PathVariable Long id) {
        reservationsService.deleteReservation(id);
        return ResponseEntity.ok().build();
    }
}
