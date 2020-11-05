package com.specialist.exam.airline.repository;

import com.specialist.exam.airline.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlightsRepository extends JpaRepository<Flight, Long> {

    @Query("SELECT DISTINCT f.cityFrom FROM Flight f WHERE f.active = 1 AND flightDate >= CURRENT_DATE")
    List citiesFrom();

    @Query("SELECT DISTINCT f.cityTo FROM Flight f WHERE f.active = 1 AND flightDate >= CURRENT_DATE")
    List citiesTo();
}
