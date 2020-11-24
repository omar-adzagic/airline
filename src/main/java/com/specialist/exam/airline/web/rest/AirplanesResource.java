package com.specialist.exam.airline.web.rest;

import com.specialist.exam.airline.domain.Airplane;
import com.specialist.exam.airline.exceptions.ErrorResponse;
import com.specialist.exam.airline.repository.FlightsRepository;
import com.specialist.exam.airline.service.AirplanesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AirplanesResource {
    @Autowired
    private AirplanesService airplanesService;
    @Autowired
    private FlightsRepository flightsRepository;

    @GetMapping("/airplanes")
    public List<Airplane> getAirplanes() {
        return this.airplanesService.getAirplanes();
    }

    @PostMapping("/airplanes")
    public Airplane storeAirplane(@Valid @RequestBody Airplane newAirplane) {
        return airplanesService.storeAirplane(newAirplane);
    }

    @DeleteMapping("/airplanes/{id}")
    public ResponseEntity deleteAirplane(@PathVariable Long id) {
        Integer count = flightsRepository.getAirplaneFlightsCount(id);
        if (count > 0) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setTimestamp(Instant.now().toString());
            errorResponse.setStatus(400);
            errorResponse.setError("Bad Request");
            errorResponse.setMessage("Ovaj avion posjeduje letove. Potrebno je prvo ukloniti sve letove koji koji su u vezi sa ovim avionom.");
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
        airplanesService.deleteAirplane(id);
        return ResponseEntity.ok().build();
    }
}
