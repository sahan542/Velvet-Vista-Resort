package com.VelvetVista.VelvetVista_Resort.service;

import com.VelvetVista.VelvetVista_Resort.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}
