package com.specialist.exam.airline.web.rest;

import com.specialist.exam.airline.domain.Airplane;
import com.specialist.exam.airline.domain.Flight;
import com.specialist.exam.airline.exceptions.ErrorResponse;
import com.specialist.exam.airline.repository.AirplanesRepository;
import com.specialist.exam.airline.repository.FlightsRepository;
import com.specialist.exam.airline.repository.PromotionsRepository;
import com.specialist.exam.airline.repository.ReservationsRepository;
import com.specialist.exam.airline.service.FlightsService;
import com.specialist.exam.airline.service.dto.FlightsScreenDTO;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
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
    @Autowired
    private AirplanesRepository airplanesRepository;
    @Autowired
    private ReservationsRepository reservationsRepository;
    @Autowired
    private PromotionsRepository promotionsRepository;

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
    public Flight storeFlight(@RequestBody @Valid Flight newFlight) {
//        return newFlight;
        Long airplianeId = newFlight.getAirplane().getId();
        Optional<Airplane> optionalAirplane = airplanesRepository.findById(airplianeId);
        newFlight.setAirplane(optionalAirplane.get());
        return flightsService.storeFlight(newFlight);
    }

    @DeleteMapping("/flights/{id}")
    public ResponseEntity deleteFlight(@PathVariable Long id) {
        Integer reservationsCount = reservationsRepository.getFlightReservationsCount(id);
        Integer promotionsCount = promotionsRepository.getFlightPromotionsCount(id);
        if (reservationsCount > 0) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setTimestamp(Instant.now().toString());
            errorResponse.setStatus(400);
            errorResponse.setError("Bad Request");
            errorResponse.setMessage("Ovaj let posjeduje rezervacije. Potrebno je prvo ukloniti sve rezervacije koje su u vezi sa ovim letom.");
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } else if (promotionsCount > 0) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setTimestamp(Instant.now().toString());
            errorResponse.setStatus(400);
            errorResponse.setError("Bad Request");
            errorResponse.setMessage("Ovaj let posjeduje promo cijene. Potrebno je prvo ukloniti sve promo cijene koje su u vezi sa ovim letom.");
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
        flightsService.deleteFlight(id);
        return ResponseEntity.ok().build();
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
