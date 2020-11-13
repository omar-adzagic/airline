package com.specialist.exam.airline.service;

import com.specialist.exam.airline.repository.RolesRepository;
import com.specialist.exam.airline.repository.UserRepository;
import com.specialist.exam.airline.service.dto.BasicUserInfoDTO;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private final UserRepository userRepository;
    private final RolesRepository rolesRepository;

    public UsersService(UserRepository userRepository, RolesRepository rolesRepository) {
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
    }

    // ovo ti je bolja praksa od autowired
    // npr ako mi treba ovdje i RoleRepository
    // ok kapiram

    // hoces li da vraca za logovanog usera ili da joj se predaje email ili id usera
    // za logovanog cim se logujem da mi ga vrati zajedno sa jwt tokenom
    public BasicUserInfoDTO getBasicUserInfo(String userName) {
        return userRepository.getBasicUserInfoByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Not found: " + userName));
    }
}
