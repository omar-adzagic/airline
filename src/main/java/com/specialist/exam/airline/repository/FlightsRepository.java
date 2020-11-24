package com.specialist.exam.airline.repository;

import com.specialist.exam.airline.domain.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlightsRepository extends JpaRepository<Flight, Long> {

    @Query("SELECT DISTINCT f.cityFrom FROM Flight f WHERE f.active = true")
        //  AND f.flightDate >= CURRENT_DATE
    List<String> citiesFrom();

    @Query("SELECT DISTINCT f.cityTo FROM Flight f WHERE f.active = true")
        //  AND f.flightDate >= CURRENT_DATE
    List<String> citiesTo();

    @Query("SELECT f FROM Flight f WHERE f.active = true AND f.cityFrom = ?1")
        //  AND f.flightDate >= CURRENT_DATE
    List<Flight> filterCityFromFlights(String citiesFromFilter);

    @Query("SELECT f FROM Flight f WHERE f.active = true AND f.cityTo = ?1")
        //  AND f.flightDate >= CURRENT_DATE
    List<Flight> filterCityToFlights(String citiesToFilter);

    @Query("SELECT f FROM Flight f WHERE f.active = true AND f.cityFrom = ?1 AND f.cityTo = ?2")
        //  AND f.flightDate >= CURRENT_DATE
    List<Flight> filterCityFromCityToFlights(String citiesFromFilter, String citiesToFilter);

    @Query("SELECT COUNT(f) FROM Flight f WHERE f.airplane.id = ?1")
    Integer getAirplaneFlightsCount(Long id);
}
