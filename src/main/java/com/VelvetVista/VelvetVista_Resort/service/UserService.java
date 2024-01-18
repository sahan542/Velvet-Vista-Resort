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
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;
    @Override
    public User registerUser(User user) {
        if (userRepository.existByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() + "already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName("ROLE_USER").get();
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
        userRepository.deleteByEmail(email);

    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
    }
}