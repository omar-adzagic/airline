package com.specialist.exam.airline.service;

import com.specialist.exam.airline.domain.Promotion;
import com.specialist.exam.airline.repository.PromotionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class PromotionsService {
    @Autowired
    PromotionsRepository promotionsRepository;

    public List<Promotion> getPromotions() {
        return this.promotionsRepository.findAll();
    }

    public void deletePromotion(Long id) {
        promotionsRepository.deleteById(id);
    }

    @Transactional
    public void deleteAll() {
        this.promotionsRepository.deleteAll();
    }
}
