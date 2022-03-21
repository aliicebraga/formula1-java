package fia.formula1.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fia.formula1.models.Penalty;
import fia.formula1.models.StatusPenalty;
import fia.formula1.models.Team;
import fia.formula1.repositories.PenaltyRepository;
import fia.formula1.repositories.TeamRepository;
import fia.formula1.services.exceptions.ObjectNotFoundException;

@Service
public class PenaltyService {

	@Autowired
	private PenaltyRepository penaltyRepository;

	@Autowired
	private TeamService teamService;

	/////////////////////////////////////////// CREATE
	/////////////////////////////////////////// ///////////////////////////////////////////
	public Penalty insertPenalty(Penalty penalty, Integer idTeam) {
		penalty.setCode(null);
		StatusPenalty status = StatusPenalty.PENDING;
		penalty.setPeStatus(status);
		Team team = teamService.showOneTeam(idTeam);
		penalty.setTeam(team);
		return penaltyRepository.save(penalty);
	}

	/////////////////////////////////////////// READ
	/////////////////////////////////////////// ///////////////////////////////////////////
	public List<Penalty> showAll() {
		return penaltyRepository.findAll();
	}

	public Penalty showOnePenalty(Integer code) {
		Optional<Penalty> penalty = penaltyRepository.findById(code);
		return penalty.orElseThrow(() -> new ObjectNotFoundException("Objeto não cadastrado! O id procurado foi: " + code));
	}

	public List<Penalty> fetchPenaltyByTeam(Integer id_team) {
		List<Penalty> penalties = penaltyRepository.fetchPenaltyByTeam(id_team);
		return penalties;
	}

	/////////////////////////////////////////// UPDATE
	/////////////////////////////////////////// ///////////////////////////////////////////
	public Penalty editPenalty(Penalty penalty, Integer idTeam) {
		Team team = teamService.showOneTeam(idTeam);
		penalty.setTeam(team);
		return penaltyRepository.save(penalty);
	}

	/////////////////////////////////////////// DELETE
	/////////////////////////////////////////// ///////////////////////////////////////////
	public void deletePenalty(Integer code) {
		Penalty pen = showOnePenalty(code);
		pen.setTeam(null);
		penaltyRepository.save(pen);
		penaltyRepository.deleteById(code);
	}

	///////////////////////////////////////// OTHER FUNCTIONS
	/////////////////////////////////////////// ///////////////////////////////////////////
	public Penalty penaltyComplete(Integer code) {
		Penalty penalty = showOnePenalty(code);
		StatusPenalty status = StatusPenalty.COMPLETE;
		penalty.setPeStatus(status);
		return penaltyRepository.save(penalty);
	}

	public Penalty penaltyCanceled(Integer code) {
		Penalty penalty = showOnePenalty(code);
		StatusPenalty status = StatusPenalty.CANCELED;
		penalty.setPeStatus(status);
		return penaltyRepository.save(penalty);
	}

}
