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

import fia.formula1.models.Team;
import fia.formula1.services.EmployeeService;
import fia.formula1.services.TeamLeaderService;
import fia.formula1.services.TeamService;

@CrossOrigin
@RestController
@RequestMapping("formulaOne")
public class TeamController {

  @Autowired
  private TeamService teamService;

  @Autowired
  private EmployeeService employeeService;

  @Autowired
  private TeamLeaderService teamLeaderService;

  /////////////////////////////////////////// CREATE
  /////////////////////////////////////////// ///////////////////////////////////////////

  ////////// insert a new team
  @PostMapping("/team")
  public ResponseEntity<Team> insertTeam(@RequestBody Team team) {
    team = teamService.insertTeam(team);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/team/{id}")
        .buildAndExpand(team.getIdTeam()).toUri();

    return ResponseEntity.created(uri).build();
  }

  /////////////////////////////////////////// READ
  /////////////////////////////////////////// ///////////////////////////////////////////

  /////// list all teams - actives and non actives
  @GetMapping("/teams")
  public List<Team> showAll() {
    List<Team> teams = teamService.showAll();
    return teams;
  }

  /////// list all actives teams
  @GetMapping("/activesTeams")
  public List<Team> showAllActives() {
    List<Team> teams = teamService.showAllActives();
    return teams;
  }

  /////// list one specific team
  @GetMapping("/team/{idTeam}")
  public ResponseEntity<?> showOne(@PathVariable Integer idTeam) {
    Team team = teamService.showOneTeam(idTeam);
    return ResponseEntity.ok().body(team);
  }

  /////// list all available teams
  @GetMapping("/availableTeams")
  public List<Team> showAllAvailableForLeader() {
    List<Team> teams = teamService.showAllAvailableForLeader();
    return teams;
  }

  /////// list one specific team leader with team
  @GetMapping("/team/teamLeader/{idTeamLeader}")
  public ResponseEntity<?> showOneTeamLeaderWithTeam(@PathVariable Integer idTeamLeader) {
    Team team = teamService.showOneTeamLeaderWithTeam(idTeamLeader);
    return ResponseEntity.ok().body(team);
  }

  /////// list one specific team leader with team
  @GetMapping("/team/employee/{idEmployee}")
  public ResponseEntity<?> showOneEmployeeWithTeam(@PathVariable Integer idEmployee) {
    Team team = teamService.showOneTeamLeaderWithTeam(idEmployee);
    return ResponseEntity.ok().body(team);
  }

  /////////////////////////////////////////// UPDATE
  /////////////////////////////////////////// ///////////////////////////////////////////

  ////// edit a team
  @PutMapping("/team/{idTeam}")
  public ResponseEntity<Void> editTeam(@PathVariable Integer idTeam, @RequestBody Team team) {
    teamService.editTeam(idTeam, team);
    return ResponseEntity.noContent().build();
  }

  /////////////////////////////////////////// DELETE
  /////////////////////////////////////////// ///////////////////////////////////////////
  /////// delete forever
  @DeleteMapping("/team/{idTeam}")
  public ResponseEntity<Void> deleteTeam(@PathVariable Integer idTeam) {
    teamService.deleteTeam(idTeam);
    return ResponseEntity.noContent().build();
  }

  /////// soft delete
  @DeleteMapping("/softDeleteTeam/{idTeam}")
  public ResponseEntity<Void> softDeleteTeam(@PathVariable Integer idTeam) {
    employeeService.employeesSetTeamNull(idTeam);
    teamLeaderService.leaderSetTeamNull(idTeam);
    teamService.softDeleteTeam(idTeam);
    return ResponseEntity.noContent().build();
  }

}
