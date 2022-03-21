package fia.formula1.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Role {

	// atributes

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idRole;

	@Column(nullable = false, length = 100)
	private String roleName;

	@Column(nullable = false, length = 40)
	private String roleDepartment;

	@Column(nullable = false, length = 150)
	private String roleAssignment;

	@JsonIgnore
	@OneToMany(mappedBy = "role")
	private List<Employee> employee = new ArrayList<>();
	
/////////// getters and setters

	public Integer getIdRole() {
		return idRole;
	}

	public void setIdRole(Integer idRole) {
		this.idRole = idRole;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleDepartment() {
		return roleDepartment;
	}

	public void setRoleDepartment(String roleDepartment) {
		this.roleDepartment = roleDepartment;
	}

	public String getRoleAssignment() {
		return roleAssignment;
	}

	public void setRoleAssignment(String roleAssignment) {
		this.roleAssignment = roleAssignment;
	}

	public List<Employee> getEmployee() {
		return employee;
	}

	public void setEmployee(List<Employee> employee) {
		this.employee = employee;
	}

	



}
