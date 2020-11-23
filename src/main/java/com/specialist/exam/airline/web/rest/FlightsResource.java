package com.specialist.exam.airline.web.rest;

import com.specialist.exam.airline.domain.Airplane;
import com.specialist.exam.airline.domain.Flight;
import com.specialist.exam.airline.repository.FlightsRepository;
import com.specialist.exam.airline.service.FlightsService;
import com.specialist.exam.airline.service.dto.FlightsScreenDTO;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class FlightsResource {
    @Autowired
    private FlightsService flightsService;
    @Autowired
    private FlightsRepository flightsRepository;

    @GetMapping("/flights")
    public FlightsScreenDTO getFlights() {
        return this.flightsService.getFlights();
    }

    @GetMapping("/flights/{id}")
    public Flight getFlight(@PathVariable Long id) {
        Optional<Flight> flightOptional = flightsRepository.findById(id);
        return flightOptional.get();
    }

    @PostMapping("/flights")
    public void storeFlight(@RequestBody @Valid Flight newFlight) {
//        return newFlight;
        flightsService.storeFlight(newFlight);
    }

    @DeleteMapping("/flights/{id}")
    public void deleteFlight(@PathVariable Long id) {
        flightsService.deleteFlight(id);
    }

    @PostMapping("/flights/filter")
    public List<Flight> filterFlights(@RequestBody Map<String, Object> payload) {
        JSONObject object = new JSONObject(payload);
        String citiesFromFilter = object.getString("citiesFromFilter");
        String citiesToFilter = object.getString("citiesToFilter");
        if (!citiesFromFilter.isEmpty() && !citiesToFilter.isEmpty()) {
            return flightsRepository.filterCityFromCityToFlights(citiesFromFilter, citiesToFilter);
        } else if (!citiesFromFilter.isEmpty()) {
            return flightsRepository.filterCityFromFlights(citiesFromFilter);
        } else if (!citiesToFilter.isEmpty()) {
            return flightsRepository.filterCityToFlights(citiesToFilter);
        }
        return null;
    }
}
