package fia.formula1.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import fia.formula1.models.Employee;
import fia.formula1.models.Team;
import fia.formula1.models.TeamLeader;
import fia.formula1.repositories.EmployeeRepository;
import fia.formula1.repositories.TeamLeaderRepository;
import fia.formula1.repositories.TeamRepository;
import fia.formula1.services.exceptions.ObjectNotFoundException;

@Service
public class TeamService {

  @Autowired
  private TeamRepository teamRepository;

  // @Autowired
  // private EmployeeService employeeService;

  @Autowired
  private EmployeeRepository employeeRepository;

  // @Autowired
  // private TeamLeaderService teamLeaderService;

  // @Autowired
  // private TeamLeaderRepository teamLeaderRepository;

  /////////////////////////////////////////// CREATE
  /////////////////////////////////////////// ///////////////////////////////////////////
  // service to insert One Team
  public Team insertTeam(Team team) {
    team.setIdTeam(null);
    team.setTeamActive(true);
    return teamRepository.save(team);
  }

  /////////////////////////////////////////// READ
  //////////////////////////////////////////////////////////////////////////////////////
  // service to show All - Active and non Active
  public List<Team> showAll() {
    return teamRepository.findAll();
  }

  ///////////// service to show All Active
  public List<Team> showAllActives() {
    return teamRepository.fetchTeamActive();
  }

  // service to show One Team Active
  public Team showOneTeam(Integer idTeam) {
    Optional<Team> team = teamRepository.oneTeamActive(idTeam);
    return team
        .orElseThrow(() -> new ObjectNotFoundException("Objeto não cadastrado! O id procurado foi: " + idTeam));
  }

  // service to show One Team bt leader
  public Team showOneTeamLeaderWithTeam(Integer idTeamLeader) {
    Optional<Team> team = teamRepository.TeamByLeader(idTeamLeader);
    return team
        .orElseThrow(() -> new ObjectNotFoundException("Objeto não cadastrado! O id procurado foi: " + idTeamLeader));
  }

  // service to show One Team by employee
  public Team showOneEmployeeWithTeam(Integer idEmployee) {
    Optional<Team> team = teamRepository.EmployeeByLeader(idEmployee);
    return team
        .orElseThrow(() -> new ObjectNotFoundException("Objeto não cadastrado! O id procurado foi: " + idEmployee));
  }

  ///////////// service to show All Active and Null - available for leader (one to
  ///////////// one)
  public List<Team> showAllAvailableForLeader() {
    return teamRepository.fetchTeamAvailableForLeader();
  }

  /////////////////////////////////////////// UPDATE
  /////////////////////////////////////////// ///////////////////////////////////////////
  // service to edit Employee
  public Team editTeam(Integer idTeam, Team team) {
    team.setIdTeam(idTeam);
    return teamRepository.save(team);
  }

  /////////////////////////////////////////// DELETE
  /////////////////////////////////////////// ///////////////////////////////////////////
  // service to delete forever
  public void deleteTeam(Integer idTeam) {
    showOneTeam(idTeam);
    try {
      teamRepository.deleteById(idTeam);
    } catch (DataIntegrityViolationException e) {
      throw new fia.formula1.services.exceptions.DataIntegrityViolationException(
          "This team cannot be deleted. There are employees related to it");
    }
  }

  // service to soft delete
  public void softDeleteTeam(Integer idTeam) {

    try {
      Team team = showOneTeam(idTeam);
      team.setEmployee(null);
      team.setTeamLeader(null);
      team.setTeamActive(false);
      teamRepository.save(team);
    } catch (DataIntegrityViolationException e) {
      throw new fia.formula1.services.exceptions.DataIntegrityViolationException(
          "This team cannot be deleted. There are employees related to it");
    }
  }

  //////////////// FUNCTION TO SAVE PHOTO
  public Team savePhoto(Integer idTeam, String photoPath) {
    Team team = showOneTeam(idTeam);
    team.setTeamLogo(photoPath);
    return teamRepository.save(team);
  }

}