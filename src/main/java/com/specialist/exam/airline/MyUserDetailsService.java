package com.specialist.exam.airline;

import com.specialist.exam.airline.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

//    @Autowired
//    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
//        Optional<User> user = userRepository.findByUserName(userName);
//        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + userName));
//
//        return user.map(MyUserDetails::new).get();
        return new User("Test","12345678", new ArrayList<>());
    }
}
