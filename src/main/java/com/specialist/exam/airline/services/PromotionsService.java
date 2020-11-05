package com.specialist.exam.airline.services;

import com.specialist.exam.airline.model.Promotion;
import com.specialist.exam.airline.repository.PromotionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class PromotionsService {
    @Autowired
    PromotionsRepository promotionsRepository;

    public List<Promotion> getPromotions() {
        return this.promotionsRepository.findAll();
    }

    @Transactional
    public void deleteAll() {
        this.promotionsRepository.deleteAll();
    }
}
