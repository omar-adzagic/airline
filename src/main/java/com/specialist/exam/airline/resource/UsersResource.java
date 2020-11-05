package com.specialist.exam.airline.resource;

import com.specialist.exam.airline.model.User;
import com.specialist.exam.airline.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersResource {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    protected List<User> getUsers() {
        return this.userRepository.findAll();
    }
}
