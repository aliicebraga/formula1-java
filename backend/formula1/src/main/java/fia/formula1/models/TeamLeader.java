package fia.formula1.models;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class TeamLeader {

	// atributes

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idTeamLeader;

	@Column(nullable = false, length = 100)
	private String leaderName;

	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(columnDefinition = "date", nullable = false)
	private Date leaderDateOfEntry;

	@Column(nullable = false, length = 40)
	private String leaderNationality;

	@Column(nullable = false)
	private Integer leaderChampionshipsWon;

	@Column(nullable = true, length = 150)
	private String leaderPhoto;

	@Column(nullable = false)
	private Boolean leaderActive;

	// on delete of the related team, it will setTeam to null
	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnore
	@JoinColumn(name = "idTeam", unique = true)
	private Team team;

	// getters and setters

	public Integer getIdTeamLeader() {
		return idTeamLeader;
	}

	public void setIdTeamLeader(Integer idTeamLeader) {
		this.idTeamLeader = idTeamLeader;
	}

	public String getLeaderName() {
		return leaderName;
	}

	public void setLeaderName(String leaderName) {
		this.leaderName = leaderName;
	}

	public Date getLeaderDateOfEntry() {
		return leaderDateOfEntry;
	}

	public void setLeaderDateOfEntry(Date leaderDateOfEntry) {
		this.leaderDateOfEntry = leaderDateOfEntry;
	}

	public String getLeaderNationality() {
		return leaderNationality;
	}

	public void setLeaderNationality(String leaderNationality) {
		this.leaderNationality = leaderNationality;
	}

	public Integer getLeaderChampionshipsWon() {
		return leaderChampionshipsWon;
	}

	public void setLeaderChampionshipsWon(Integer leaderChampionshipsWon) {
		this.leaderChampionshipsWon = leaderChampionshipsWon;
	}

	public String getLeaderPhoto() {
		return leaderPhoto;
	}

	public void setLeaderPhoto(String leaderPhoto) {
		this.leaderPhoto = leaderPhoto;
	}

	public Boolean getLeaderActive() {
		return leaderActive;
	}

	public void setLeaderActive(Boolean leaderActive) {
		this.leaderActive = leaderActive;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

}
