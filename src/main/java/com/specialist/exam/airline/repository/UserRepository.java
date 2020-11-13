package com.specialist.exam.airline.repository;

import com.specialist.exam.airline.domain.User;
import com.specialist.exam.airline.service.dto.BasicUserInfoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String userName);

    @Query("select new com.specialist.exam.airline.service.dto.BasicUserInfoDTO(u.id, u.firstName, u.lastName, u.email, u.userName, u.role.name) from User u where u.userName = ?1")
    Optional<BasicUserInfoDTO> getBasicUserInfoByUserName(String username);
}
