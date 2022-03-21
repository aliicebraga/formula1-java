package fia.formula1.models;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Employee {

	// atributes

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idEmployee;

	@Column(nullable = false, length = 100)
	private String empName;

	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(columnDefinition = "date", nullable = false)
	private Date empBirth;

	@Column(nullable = false, length = 50)
	private String empContact;

	@Column(nullable = false, length = 40)
	private String empNationality;

	@ManyToOne
	@JoinColumn(name = "idRole")
	private Role role;

	@NumberFormat(pattern = "#.##0,00")
	@Column(nullable = false)
	private Double empWage;

	@Column(nullable = true, length = 150)
	private String empPhoto;

	@Column(nullable = false)
	private Boolean empActive;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "idTeam")
	private Team team;

	// getters and setters

	public Integer getIdEmployee() {
		return idEmployee;
	}

	public void setIdEmployee(Integer idEmployee) {
		this.idEmployee = idEmployee;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public Date getEmpBirth() {
		return empBirth;
	}

	public void setEmpBirth(Date empBirth) {
		this.empBirth = empBirth;
	}

	public String getEmpContact() {
		return empContact;
	}

	public void setEmpContact(String empContact) {
		this.empContact = empContact;
	}

	public String getEmpNationality() {
		return empNationality;
	}

	public void setEmpNationality(String empNationality) {
		this.empNationality = empNationality;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Double getEmpWage() {
		return empWage;
	}

	public void setEmpWage(Double empWage) {
		this.empWage = empWage;
	}

	public String getEmpPhoto() {
		return empPhoto;
	}

	public void setEmpPhoto(String empPhoto) {
		this.empPhoto = empPhoto;
	}

	public Boolean getEmpActive() {
		return empActive;
	}

	public void setEmpActive(Boolean empActive) {
		this.empActive = empActive;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

}
