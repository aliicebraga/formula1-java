package fia.formula1.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fia.formula1.models.Penalty;

public interface PenaltyRepository extends JpaRepository<Penalty, Integer> {

	@Query(value = "SELECT * FROM db_formula1.penalty WHERE id_team = :id_team", nativeQuery = true)
	List<Penalty> fetchPenaltyByTeam(Integer id_team);

}
