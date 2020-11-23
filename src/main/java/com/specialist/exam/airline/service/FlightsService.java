package com.specialist.exam.airline.service;

import com.specialist.exam.airline.domain.Airplane;
import com.specialist.exam.airline.domain.Flight;
import com.specialist.exam.airline.repository.AirplanesRepository;
import com.specialist.exam.airline.repository.FlightsRepository;
import com.specialist.exam.airline.service.dto.FlightsScreenDTO;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class FlightsService {
    @Autowired
    FlightsRepository flightsRepository;
    @Autowired
    AirplanesRepository airplanesRepository;

    public FlightsScreenDTO getFlights() {
        List<Flight> flights = this.flightsRepository.findAll();
        List<String> citiesFrom = this.flightsRepository.citiesFrom();
        List<String> citiesTo = this.flightsRepository.citiesTo();
        List<Airplane> airplanes = this.airplanesRepository.findAll();
        FlightsScreenDTO flightsScreenDTO = new FlightsScreenDTO();
        flightsScreenDTO.setFlights(flights);
        flightsScreenDTO.setCitiesFrom(citiesFrom);
        flightsScreenDTO.setCitiesTo(citiesTo);
        flightsScreenDTO.setAirplanes(airplanes);
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
