package fia.formula1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fia.formula1.models.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
