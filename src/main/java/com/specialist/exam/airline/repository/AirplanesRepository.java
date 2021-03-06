package com.specialist.exam.airline.repository;

import com.specialist.exam.airline.domain.Airplane;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirplanesRepository extends JpaRepository<Airplane, Long> {
}
