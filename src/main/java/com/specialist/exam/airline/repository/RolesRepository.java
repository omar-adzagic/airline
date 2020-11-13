package com.specialist.exam.airline.repository;

import com.specialist.exam.airline.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Role, Long> {
}
