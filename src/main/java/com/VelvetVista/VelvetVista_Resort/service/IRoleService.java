package com.VelvetVista.VelvetVista_Resort.service;
import com.VelvetVista.VelvetVista_Resort.model.Role;
import com.VelvetVista.VelvetVista_Resort.model.User;

import java.util.List;

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role theRole);

    void deleteRole(Long id);
    Role findByName(String name);

    User removeUserFromRole(Long userId, Long roleId);

    User assignRoleToUser(Long userId, Long roleId);
    Role removeAllUsersFromRole(Long roleId);

    User assignUserToRole(Long userId, Long roleId);
}
