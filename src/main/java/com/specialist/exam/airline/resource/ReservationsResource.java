package com.specialist.exam.airline.resource;

import com.specialist.exam.airline.model.Reservation;
import com.specialist.exam.airline.services.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ReservationsResource {
    @Autowired
    private ReservationsService reservationsService;

    @GetMapping("/reservations")
    public List<Reservation> getReservations() {
        return this.reservationsService.getReservations();
    }

    @GetMapping("/reservations/my")
    public List<Reservation> getMyReservations() {
        return this.reservationsService.getMyReservations();
    }
}
