package com.specialist.exam.airline.repository;

import com.specialist.exam.airline.domain.Flight;
import com.specialist.exam.airline.domain.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PromotionsRepository extends JpaRepository<Promotion, Long> {
    @Query("SELECT f FROM Flight f WHERE f.active = 1 AND f.cityFrom = 'Beograd' AND f.flightDate >= CURRENT_DATE")
    List<Flight> flights();

    @Query("SELECT count(p) FROM Promotion p WHERE p.flight.id = ?1")
    Integer getFlightPromotionsCount(Long id);
}
