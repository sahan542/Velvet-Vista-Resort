package com.VelvetVista.VelvetVista_Resort.repository;

import com.VelvetVista.VelvetVista_Resort.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String role);



}

