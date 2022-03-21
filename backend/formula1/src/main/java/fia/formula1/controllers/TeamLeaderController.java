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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fia.formula1.models.TeamLeader;
import fia.formula1.services.TeamLeaderService;

@CrossOrigin
@RestController
@RequestMapping("formulaOne")
public class TeamLeaderController {

  @Autowired
  private TeamLeaderService teamLeaderService;

  /////////////////////////////////////////// CREATE
  /////////////////////////////////////////// ///////////////////////////////////////////

  ////////// insert a new team leader
  @PostMapping("/teamLeader")
  public ResponseEntity<TeamLeader> insertEmploy(@RequestParam(value = "team", required = false) Integer idTeam,
      @RequestBody TeamLeader leader) {
    leader = teamLeaderService.insertLeader(idTeam, leader);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
        .buildAndExpand(leader.getIdTeamLeader()).toUri();

    return ResponseEntity.created(uri).build();
  }

  /////////////////////////////////////////// READ
  /////////////////////////////////////////// ///////////////////////////////////////////

  /////// list all leaders - actives and non actives
  @GetMapping("/teamLeaders")
  public List<TeamLeader> showAll() {
    List<TeamLeader> leaders = teamLeaderService.showAll();
    return leaders;
  }

  /////// list all actives leaders
  @GetMapping("/activesTeamLeaders")
  public List<TeamLeader> showAllActives() {
    List<TeamLeader> leaders = teamLeaderService.showAllActives();
    return leaders;
  }

  /////// list show leaders and teams
  @GetMapping("/leadersRightTeam")
  public List<List> leadersRightTeam() {
    List<List> leaders = teamLeaderService.leadersRightTeam();
    return leaders;
  }

  /////// list one specific leader
  @GetMapping("/teamLeader/{idTeamLeader}")
  public ResponseEntity<?> showOne(@PathVariable Integer idTeamLeader) {
    TeamLeader leader = teamLeaderService.showOneLeader(idTeamLeader);
    return ResponseEntity.ok().body(leader);
  }

  ////// list the leader from one specific team
  @GetMapping("/teamLeaderByTeam/{id_team}")
  public TeamLeader showLeaderByTeam(@PathVariable Integer id_team) {
    TeamLeader leader = teamLeaderService.queryLeaderByTeam(id_team);
    return leader;
  }

  /////// list all leaders that doesnt have a team
  @GetMapping("/teamLeaderTeamNull")
  public List<TeamLeader> showLeaderTeamNull() {
    List<TeamLeader> leaders = teamLeaderService.queryLeaderTeamNull();
    return leaders;
  }

  /////// list all available leaders
  @GetMapping("/availableTeamLeaders")
  public List<TeamLeader> showAllAvailable() {
    List<TeamLeader> leaders = teamLeaderService.showAllAvailable();
    return leaders;
  }

  /////////////////////////////////////////// UPDATE
  /////////////////////////////////////////// ///////////////////////////////////////////
  ////// edit a leader
  @PutMapping("/teamLeader/{idTeamLeader}")
  public ResponseEntity<TeamLeader> editLeader(@RequestParam(value = "team", required = false) Integer idTeam,
      @PathVariable Integer idTeamLeader, @RequestBody TeamLeader leader) {
    leader.setIdTeamLeader(idTeamLeader);
    leader = teamLeaderService.editLeader(idTeam, leader);
    return ResponseEntity.noContent().build();
  }

  ////// edit a leader to leave it without team
  @PutMapping("/leaveTeam/teamLeader/{idTeamLeader}")
  public ResponseEntity<TeamLeader> editLeaveLeaderWithoutTeam(
      @PathVariable Integer idTeamLeader, @RequestBody TeamLeader leader) {
    leader.setIdTeamLeader(idTeamLeader);
    leader = teamLeaderService.leaveLeaderWithoutTeam(leader);
    return ResponseEntity.noContent().build();
  }

  ///////////////////////////////////////// DELETE
  /////////////////////////////////////////// ///////////////////////////////////////////
  /////// delete forever
  @DeleteMapping("/teamLeader/{idTeamLeader}")
  public ResponseEntity<Void> deleteLeader(@PathVariable Integer idTeamLeader) {
    teamLeaderService.deleteLeader(idTeamLeader);
    return ResponseEntity.noContent().build();
  }

  /////// soft delete
  @DeleteMapping("/softDeleteTeamLeader/{idTeamLeader}")
  public ResponseEntity<Void> softDeleteLeader(@PathVariable Integer idTeamLeader) {
    teamLeaderService.softDeleteLeader(idTeamLeader);
    return ResponseEntity.noContent().build();
  }

}
