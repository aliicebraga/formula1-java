package fia.formula1.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fia.formula1.models.Team;

public interface TeamRepository extends JpaRepository<Team, Integer> {

	@Query(value = "SELECT * FROM team WHERE team_active is true order by team_name", nativeQuery = true)
	List<Team> fetchTeamActive();

	@Query(value = "SELECT * FROM team WHERE team_active is true and id_team_leader is null order by team_name", nativeQuery = true)
	List<Team> fetchTeamAvailableForLeader();

	// @Query(value = "SELECT * FROM team WHERE team_active is true order by
	// team_name", nativeQuery = true)
	// List<Team> fetchTeamAvailableForEmployee();

	@Query(value = "SELECT * FROM team WHERE id_team_leader = :id_team_leader", nativeQuery = true)
	Optional<Team> TeamByLeader(Integer id_team_leader);

	@Query(value = "SELECT * FROM team WHERE id_employee = :id_employee", nativeQuery = true)
	Optional<Team> EmployeeByLeader(Integer id_employee);

	@Query(value = "SELECT * FROM team WHERE id_team = :id_team and team_active is true", nativeQuery = true)
	Optional<Team> oneTeamActive(Integer id_team);
}
