package com.specialist.exam.airline.service;

import com.specialist.exam.airline.domain.Reservation;
import com.specialist.exam.airline.repository.ReservationsRepository;
import com.specialist.exam.airline.service.dto.ReservationsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationsService {
    @Autowired
    ReservationsRepository reservationsRepository;

    public List<Reservation> getReservations() {
        return this.reservationsRepository.findAll();
    }

    public List<Reservation> getMyReservations(Long userId) {
        return this.reservationsRepository.getMyReservations(userId);
    }

    public void deleteReservation(Long id) {
        reservationsRepository.deleteById(id);
    }

    public Reservation storeReservation(Reservation reservation) {
        return reservationsRepository.save(reservation);
    }

    @Transactional
    public void deleteAll() {
        this.reservationsRepository.deleteAll();
    }
}
