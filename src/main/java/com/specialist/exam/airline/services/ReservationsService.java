package com.specialist.exam.airline.services;

import com.specialist.exam.airline.model.Reservation;
import com.specialist.exam.airline.repository.ReservationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ReservationsService {
    @Autowired
    ReservationsRepository reservationsRepository;

    public List<Reservation> getReservations() {
        return this.reservationsRepository.findAll();
    }

    public List<Reservation> getMyReservations() {
        return this.reservationsRepository.getMyReservations();
    }

    @Transactional
    public void deleteAll() {
        this.reservationsRepository.deleteAll();
    }
}
