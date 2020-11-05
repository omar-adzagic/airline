package com.specialist.exam.airline.services;

import com.specialist.exam.airline.model.Flight;
import com.specialist.exam.airline.repository.FlightsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class FlightsService {
    @Autowired
    FlightsRepository flightsRepository;

    public Map<String, List> getFlights() {
        List<Flight> flights = this.flightsRepository.findAll();
        List citiesFrom = this.flightsRepository.citiesFrom();
        List citiesTo = this.flightsRepository.citiesTo();
        Map<String, List> map = new HashMap<String, List>();
        map.put("flights", flights);
        map.put("citiesFrom", citiesFrom);
        map.put("citiesTo", citiesTo);
        return map;
    }

    public void storeFlight(Flight flight) {
        this.flightsRepository.save(flight);
    }

    public void deleteFlight(Long id) {
        this.flightsRepository.deleteById(id);
    }

    @Transactional
    public void deleteAll() {
        this.flightsRepository.deleteAll();
    }
}
