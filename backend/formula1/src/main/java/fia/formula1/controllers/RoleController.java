package fia.formula1.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fia.formula1.models.Role;
import fia.formula1.services.RoleService;

@CrossOrigin
@RestController
@RequestMapping("formulaOne")
public class RoleController {
	
	@Autowired
	private RoleService roleService;
	
	  /////////////////////////////////////////// CREATE
	  /////////////////////////////////////////// ///////////////////////////////////////////

	  ////////// insert new
	  @PostMapping("/role")
	  public ResponseEntity<Role> insertRole(@RequestBody Role role) {
		  role = roleService.insertRole(role);
	    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/role/{id}")
	        .buildAndExpand(role.getIdRole()).toUri();
	    return ResponseEntity.created(uri).build();
	  }

	  /////////////////////////////////////////// READ
	  /////////////////////////////////////////// ///////////////////////////////////////////

	  /////// list all 
	  @GetMapping("/roles")
	  public List<Role> showAll() {
	    List<Role> roles = roleService.showAll();
	    return roles;
	  }

	  /////// list one specific 
	  @GetMapping("/role/{idRole}")
	  public ResponseEntity<?> showOne(@PathVariable Integer idRole) {
	    Role role = roleService.showOneRole(idRole);
	    return ResponseEntity.ok().body(role);
	  }

	  /////////////////////////////////////////// UPDATE
	  /////////////////////////////////////////// ///////////////////////////////////////////

	  ////// edit 
	  @PutMapping("/role/{idRole}")
	  public ResponseEntity<Void> editRole(@PathVariable Integer idRole, @RequestBody Role role) {
		  roleService.editRole(idRole, role);
	    return ResponseEntity.noContent().build();
	  }

	  /////////////////////////////////////////// DELETE
	  /////////////////////////////////////////// ///////////////////////////////////////////
	  /////// delete forever
	  @DeleteMapping("/role/{idRole}")
	  public ResponseEntity<Void> deleteRole(@PathVariable Integer idRole) {
		  roleService.deleteRole(idRole);
	    return ResponseEntity.noContent().build();
	  }



}
