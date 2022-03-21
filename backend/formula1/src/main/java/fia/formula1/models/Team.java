package fia.formula1.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class Team {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idTeam;

	@Column(nullable = false, length = 150)
	private String teamName;

	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(columnDefinition = "date", nullable = false)
	private Date teamDateOfCreation;

	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(columnDefinition = "date", nullable = false)
	// @Temporal(TemporalType.DATE)
	private Date teamDateOfEntry;

	@Column(nullable = false, length = 100)
	private String teamEngineSuplier;

	@Column(nullable = true, length = 150)
	private String teamLogo;

	@Column(nullable = false)
	private Boolean teamActive;

	@OneToMany(mappedBy = "team")
	private List<Employee> employee = new ArrayList<Employee>();

	@OneToOne
	@JoinColumn(name = "idTeamLeader", unique = true)
	private TeamLeader teamLeader;

	// getters and setters

	public Integer getIdTeam() {
		return idTeam;
	}

	public void setIdTeam(Integer idTeam) {
		this.idTeam = idTeam;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public Date getTeamDateOfCreation() {
		return teamDateOfCreation;
	}

	public void setTeamDateOfCreation(Date teamDateOfCreation) {
		this.teamDateOfCreation = teamDateOfCreation;
	}

	public Date getTeamDateOfEntry() {
		return teamDateOfEntry;
	}

	public void setTeamDateOfEntry(Date teamDateOfEntry) {
		this.teamDateOfEntry = teamDateOfEntry;
	}

	public String getTeamEngineSuplier() {
		return teamEngineSuplier;
	}

	public void setTeamEngineSuplier(String teamEngineSuplier) {
		this.teamEngineSuplier = teamEngineSuplier;
	}

	public String getTeamLogo() {
		return teamLogo;
	}

	public void setTeamLogo(String teamLogo) {
		this.teamLogo = teamLogo;
	}

	public Boolean getTeamActive() {
		return teamActive;
	}

	public void setTeamActive(Boolean teamActive) {
		this.teamActive = teamActive;
	}

	public List<Employee> getEmployee() {
		return employee;
	}

	public void setEmployee(List<Employee> employee) {
		this.employee = employee;
	}

	public TeamLeader getTeamLeader() {
		return teamLeader;
	}

	public void setTeamLeader(TeamLeader teamLeader) {
		this.teamLeader = teamLeader;
	}

}
