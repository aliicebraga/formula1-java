package fia.formula1.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fia.formula1.models.TeamLeader;

public interface TeamLeaderRepository extends JpaRepository<TeamLeader, Integer> {

  // INNER JOIN from two tables - team leader and team
  @Query(value = "SELECT team_leader.id_team_leader, team_leader.leader_name, team_leader.leader_photo, team.id_team, team.team_name, team.team_logo FROM team  right JOIN team_leader ON team_leader.id_team = team.id_team WHERE team_leader.leader_active is true order by leader_name", nativeQuery = true)
  List<List> leadersRightTeam();

  @Query(value = "SELECT * FROM team_leader WHERE id_team = :id_team", nativeQuery = true)
  TeamLeader LeaderByTeam(Integer id_team);

  @Query(value = "SELECT * FROM team_leader WHERE id_team is null", nativeQuery = true)
  List<TeamLeader> fetchLeaderByNull();

  @Query(value = "SELECT * FROM team_leader WHERE leader_active is true order by leader_name", nativeQuery = true)
  List<TeamLeader> fetchLeaderActive();

  @Query(value = "SELECT * FROM team_leader WHERE leader_active is true and id_team is null order by leader_name", nativeQuery = true)
  List<TeamLeader> availableLeaders();

  @Query(value = "SELECT * FROM team_leader WHERE id_team_leader = :id_team_leader and leader_active is true", nativeQuery = true)
  Optional<TeamLeader> oneTeamLeaderActive(Integer id_team_leader);

}
