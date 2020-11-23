package com.specialist.exam.airline.web.rest;

import com.specialist.exam.airline.domain.Flight;
import com.specialist.exam.airline.domain.Promotion;
import com.specialist.exam.airline.repository.FlightsRepository;
import com.specialist.exam.airline.repository.PromotionsRepository;
import com.specialist.exam.airline.service.PromotionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PromotionsResource {
    @Autowired
    PromotionsRepository promotionsRepository;
    @Autowired
    PromotionsService promotionsService;
    @Autowired
    FlightsRepository flightsRepository;

    @GetMapping("/promotions")
    public Map<String, List> promotions() {
        // return promotionsService.getPromotions();
        List<Promotion> promotions = this.promotionsRepository.findAll();
        List flights = this.promotionsRepository.flights();
        Map<String, List> map = new HashMap<String, List>();
        map.put("promotions", promotions);
        map.put("flights", flights);
        return map;
    }

    @PutMapping("/promotions/{id}")
    public ResponseEntity<Flight> storePromotion(@PathVariable Long id, @Valid @RequestBody Flight flightDetails) throws Exception {
        Flight flight = this.flightsRepository.findById(id)
                .orElseThrow(() -> new Exception("Nije pronađena promocija sa idem :: " + id));
        Promotion promotion = new Promotion();
        promotion.setFlight(flight);
        this.promotionsRepository.save(promotion);
        flight.setPrice(flightDetails.getPrice());
        flight.setPromoted(true);
        final Flight updatedFlight = this.flightsRepository.save(flight);
        return ResponseEntity.ok(updatedFlight);
    }
}
