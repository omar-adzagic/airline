package com.specialist.exam.airline.web.rest;

import com.specialist.exam.airline.domain.Flight;
import com.specialist.exam.airline.service.FlightsService;
import com.specialist.exam.airline.service.dto.FlightsScreenDTO;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class FlightsResource {
    @Autowired
    private FlightsService flightsService;

    @GetMapping("/flights")
    public FlightsScreenDTO getFlights() {
        return this.flightsService.getFlights();
    }

    @PostMapping("/flights")
    public String storeFlight(@RequestBody @Valid Flight newFlight) {
        flightsService.storeFlight(newFlight);
        return null;
    }

    @DeleteMapping("/flights/{id}")
    public Flight deleteFlight(@PathVariable Long id) {
        flightsService.deleteFlight(id);
        return null;
    }

    @PostMapping("/flights/filter")
    public JSONObject filterFlights(@RequestBody String filtersJson) {
        Logger logger = Logger.getLogger(FlightsResource.class.getName());
        JSONObject filters = new JSONObject(filtersJson);
        logger.warning(filters.getString("citiesFromFilter"));
        return filters;
        // return null;
    }
}
