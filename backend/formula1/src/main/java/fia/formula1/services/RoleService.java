package fia.formula1.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import fia.formula1.models.Role;
import fia.formula1.repositories.RoleRepository;
import fia.formula1.services.exceptions.ObjectNotFoundException;

@Service
public class RoleService {

	@Autowired
	private RoleRepository roleRepository;

	/////////////////////////////////////////// CREATE
	/////////////////////////////////////////// ///////////////////////////////////////////
	// service to insert One Team
	public Role insertRole(Role role) {
		role.setIdRole(null);
		return roleRepository.save(role);
	}

	/////////////////////////////////////////// READ
	//////////////////////////////////////////////////////////////////////////////////////
	// service to show All - Active and non Active
	public List<Role> showAll() {
		return roleRepository.findAll();
	}

	// service to show One Team
	public Role showOneRole(Integer idRole) {
		Optional<Role> role = roleRepository.findById(idRole);
		return role
				.orElseThrow(() -> new ObjectNotFoundException("Objeto não cadastrado! O id procurado foi: " + idRole));
	}

	/////////////////////////////////////////// UPDATE
	/////////////////////////////////////////// ///////////////////////////////////////////

	// service to edit Employee
	public Role editRole(Integer idRole, Role role) {
		role.setIdRole(idRole);
		return roleRepository.save(role);
	}

	/////////////////////////////////////////// DELETE
	/////////////////////////////////////////// ///////////////////////////////////////////

	// service to delete forever
	public void deleteRole(Integer idRole) {
		showOneRole(idRole);
		try {
			roleRepository.deleteById(idRole);
		} catch (DataIntegrityViolationException e) {
			throw new fia.formula1.services.exceptions.DataIntegrityViolationException(
					"This role cannot be deleted. There are employees related to it");
		}
	}

}
