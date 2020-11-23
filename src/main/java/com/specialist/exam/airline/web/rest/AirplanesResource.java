package com.specialist.exam.airline.web.rest;

import com.specialist.exam.airline.domain.Airplane;
import com.specialist.exam.airline.service.AirplanesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AirplanesResource {
    @Autowired
    private AirplanesService airplanesService;

    @GetMapping("/airplanes")
    public List<Airplane> getAirplanes() {
        return this.airplanesService.getAirplanes();
    }

    @PostMapping("/airplanes")
    public String storeAirplane(@Valid @RequestBody Airplane newAirplane) {
        this.airplanesService.storeAirplane(newAirplane);
        return null;
    }

    @DeleteMapping("/airplanes/{id}")
    public Airplane deleteAirplane(@PathVariable Long id) {
        this.airplanesService.deleteAirplane(id);
        return null;
    }
}
