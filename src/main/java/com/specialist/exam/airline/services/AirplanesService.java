package com.specialist.exam.airline.services;

import com.specialist.exam.airline.model.Airplane;
import com.specialist.exam.airline.repository.AirplanesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirplanesService {

    @Autowired
    AirplanesRepository airplanesRepository;

    public List<Airplane> getAirplanes() {
        return this.airplanesRepository.findAll();
    }

    public void storeAirplane(Airplane airplane) {
        this.airplanesRepository.save(airplane);
    }

    public void deleteAirplane(Long id) {
        this.airplanesRepository.deleteById(id);
    }
}