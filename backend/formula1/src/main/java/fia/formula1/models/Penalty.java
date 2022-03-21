package fia.formula1.models;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

// import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Penalty {

	// ATRIBUTES

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer code;

	@Column(nullable = false)
	private String peDescription;

	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(columnDefinition = "date", nullable = false)
	private Date peDueDate;

	@NumberFormat(pattern = "#.##0,00")
	@Column(nullable = false)
	private Double peValue;

	@Enumerated(EnumType.STRING)
	private StatusPenalty peStatus;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "idTeam")
	private Team team;

	// getters and setters

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getPeDescription() {
		return peDescription;
	}

	public void setPeDescription(String peDescription) {
		this.peDescription = peDescription;
	}

	public Date getPeDueDate() {
		return peDueDate;
	}

	public void setPeDueDate(Date peDueDate) {
		this.peDueDate = peDueDate;
	}

	public Double getPeValue() {
		return peValue;
	}

	public void setPeValue(Double peValue) {
		this.peValue = peValue;
	}

	public StatusPenalty getPeStatus() {
		return peStatus;
	}

	public void setPeStatus(StatusPenalty peStatus) {
		this.peStatus = peStatus;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

}
