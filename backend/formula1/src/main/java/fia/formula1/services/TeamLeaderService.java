package fia.formula1.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fia.formula1.models.Team;
import fia.formula1.models.TeamLeader;
import fia.formula1.repositories.TeamLeaderRepository;
import fia.formula1.repositories.TeamRepository;
import fia.formula1.services.exceptions.ObjectNotFoundException;

@Service
public class TeamLeaderService {

  @Autowired
  private TeamLeaderRepository teamLeaderRepository;

  @Autowired
  private TeamService teamService;

  @Autowired
  private TeamRepository teamRepository;

  /////////////////////////////////////////// CREATE
  /////////////////////////////////////////// ///////////////////////////////////////////
  // service to insert One Team Leader
  public TeamLeader insertLeader(Integer idTeam, TeamLeader leader) {
    leader.setIdTeamLeader(null);
    leader.setLeaderActive(true);
    if (idTeam != null) {
      Team team = teamService.showOneTeam(idTeam);
      team.setTeamLeader(leader);
      leader.setTeam(team);
    }
    return teamLeaderRepository.save(leader);
  }

  /////////////////////////////////////////// READ
  /////////////////////////////////////////// ///////////////////////////////////////////

  // service to show All - Active and non Active
  public List<TeamLeader> showAll() {
    return teamLeaderRepository.findAll();
  }

  ///////////// service to show All Active
  public List<TeamLeader> showAllActives() {
    return teamLeaderRepository.fetchLeaderActive();
  }

  ////// service to list show leaders and teams
  public List<List> leadersRightTeam() {
    List<List> leaders = teamLeaderRepository.leadersRightTeam();
    return leaders;
  }

  // service to show One Leader
  public TeamLeader showOneLeader(Integer idTeamLeader) {
    Optional<TeamLeader> leader = teamLeaderRepository.oneTeamLeaderActive(idTeamLeader);

    return leader.orElseThrow(
        () -> new ObjectNotFoundException("Objeto não cadastrado! O id procurado foi: " + idTeamLeader));
  }

  // service to show one leader by a specific team
  public TeamLeader queryLeaderByTeam(Integer idTeam) {
    TeamLeader leader = teamLeaderRepository.LeaderByTeam(idTeam);
    return leader;
  }

  // service to show all leader that doesnt have a team
  public List<TeamLeader> queryLeaderTeamNull() {
    return teamLeaderRepository.fetchLeaderByNull();
  }

  ///////////// service to show All Active
  public List<TeamLeader> showAllAvailable() {
    return teamLeaderRepository.availableLeaders();
  }

  /////////////////////////////////////////// UPDATE
  /////////////////////////////////////////// ///////////////////////////////////////////

  // service to edit Employee
  public TeamLeader editLeader(Integer idTeam, TeamLeader leader) {
    TeamLeader leaderCurrent = showOneLeader(leader.getIdTeamLeader());
    if (idTeam != null) {
      updateTeam(idTeam, leaderCurrent);
      Team teamNew = teamService.showOneTeam(idTeam);
      leader.setTeam(teamNew);
      teamNew.setTeamLeader(leader);
    }
    return teamLeaderRepository.save(leader);
  }

  // this function helps when the leader needs to change between teams
  public void updateTeam(Integer idTeam, TeamLeader leader) {
    Team teamCurrent = leader.getTeam();

    if (teamCurrent != null && teamCurrent.getIdTeam() != idTeam) {
      teamCurrent.setTeamLeader(null);
      leader.setTeam(null);
      teamRepository.save(teamCurrent);
      teamLeaderRepository.save(leader);
    }

  }

  // leave leader without team
  public TeamLeader leaveLeaderWithoutTeam(TeamLeader leader) {
    TeamLeader leaderCurrent = showOneLeader(leader.getIdTeamLeader());

    Team teamCurrent = leaderCurrent.getTeam();
    if (teamCurrent != null) {
      teamCurrent.setTeamLeader(null);
      leaderCurrent.setTeam(null);
      teamRepository.save(teamCurrent);
    }
    return teamLeaderRepository.save(leaderCurrent);
  }

  /////////////////////////////////////////// DELETE
  /////////////////////////////////////////// ///////////////////////////////////////////

  // service to delete forever
  public void deleteLeader(Integer idTeamLeader) {
    teamLeaderRepository.deleteById(idTeamLeader);
  }

  // service to soft delete
  public void softDeleteLeader(Integer idTeamLeader) {
    TeamLeader leader = showOneLeader(idTeamLeader);
    leader.setLeaderActive(false);
    teamLeaderRepository.save(leader);
  }

  //////////////// FUNCTION TO SAVE PHOTO
  public TeamLeader savePhoto(Integer idTeamLeader, String photoPath) {
    TeamLeader teamLeader = showOneLeader(idTeamLeader);
    teamLeader.setLeaderPhoto(photoPath);
    return teamLeaderRepository.save(teamLeader);
  }

  //////// FUNCTION TO SET TEAM NULL OF A TEAM LEADER
  public void leaderSetTeamNull(Integer idTeam) {
    Team team = teamService.showOneTeam(idTeam);
    if (team.getTeamLeader() != null) {
      TeamLeader leaderRelated = team.getTeamLeader();
      leaderRelated = showOneLeader(leaderRelated.getIdTeamLeader());
      leaderRelated.setTeam(null);
      teamLeaderRepository.save(leaderRelated);
    }
  }

}