package com.specialist.exam.airline.service;

import com.specialist.exam.airline.domain.Airplane;
import com.specialist.exam.airline.repository.AirplanesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirplanesService {

    @Autowired
    AirplanesRepository airplanesRepository;

    public List<Airplane> getAirplanes() {
        return this.airplanesRepository.findAll();
    }

    public Airplane storeAirplane(Airplane airplane) {
        return airplanesRepository.save(airplane);
    }

    public void deleteAirplane(Long id) {
        this.airplanesRepository.deleteById(id);
    }
}