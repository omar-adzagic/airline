package com.specialist.exam.airline.service;

import com.specialist.exam.airline.domain.Flight;
import com.specialist.exam.airline.repository.FlightsRepository;
import com.specialist.exam.airline.service.dto.FlightsScreenDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class FlightsService {
    @Autowired
    FlightsRepository flightsRepository;

    public FlightsScreenDTO getFlights() {
        List<Flight> flights = this.flightsRepository.findAll();
        List<String> citiesFrom = this.flightsRepository.citiesFrom();
        List<String> citiesTo = this.flightsRepository.citiesTo();
        FlightsScreenDTO flightsScreenDTO = new FlightsScreenDTO();
        flightsScreenDTO.setFlights(flights);
        flightsScreenDTO.setCitiesFrom(citiesFrom);
        flightsScreenDTO.setCitiesTo(citiesTo);
        return flightsScreenDTO;
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
