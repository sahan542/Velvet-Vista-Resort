package com.VelvetVista.VelvetVista_Resort.service;



import com.VelvetVista.VelvetVista_Resort.exception.UserAlreadyExistsException;
import com.VelvetVista.VelvetVista_Resort.model.Role;
import com.VelvetVista.VelvetVista_Resort.model.User;
import com.VelvetVista.VelvetVista_Resort.repository.RoleRepository;
import com.VelvetVista.VelvetVista_Resort.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        /*
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);

         */
        //Fetch the ROLE_USER from the DB
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("ROLE_USER not found"));

        //Make sure the role entity is managed
        if (userRole.getId() == null){
            roleRepository.save(userRole);
        }
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);

    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if (theUser != null){
            userRepository.deleteByEmail(email);
        }

    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
