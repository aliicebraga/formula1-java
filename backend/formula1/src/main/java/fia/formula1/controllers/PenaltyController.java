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

import fia.formula1.models.Penalty;
import fia.formula1.services.PenaltyService;
import fia.formula1.services.RoleService;

@CrossOrigin
@RestController
@RequestMapping("formulaOne")
public class PenaltyController {

	@Autowired
	private PenaltyService penaltyService;

	/////////////////////////////////////////// CREATE
	/////////////////////////////////////////// ///////////////////////////////////////////

	////////// insert new
	@PostMapping("/penalty/{idTeam}")
	public ResponseEntity<Penalty> insertPenalty(@PathVariable Integer idTeam, @RequestBody Penalty penalty) {
		penalty = penaltyService.insertPenalty(penalty, idTeam);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/penalty/{id}")
				.buildAndExpand(penalty.getCode()).toUri();
		return ResponseEntity.created(uri).build();
	}

	/////////////////////////////////////////// READ
	/////////////////////////////////////////// ///////////////////////////////////////////

	/////// list all
	@GetMapping("/penalties")
	public List<Penalty> showAll() {
		List<Penalty> penalties = penaltyService.showAll();
		return penalties;
	}

	/////// list one specific
	@GetMapping("/penalty/{code}")
	public ResponseEntity<?> showOne(@PathVariable Integer code) {
		Penalty penalty = penaltyService.showOnePenalty(code);
		return ResponseEntity.ok().body(penalty);
	}

	/////// list all
	@GetMapping("/penalties/team/{id_team}")
	public List<Penalty> showByTeam(@PathVariable Integer id_team) {
		List<Penalty> penalties = penaltyService.fetchPenaltyByTeam(id_team);
		return penalties;
	}

	/////////////////////////////////////////// UPDATE
	/////////////////////////////////////////// ///////////////////////////////////////////

	////// edit
	@PutMapping("/penalty/{code}")
	public ResponseEntity<Void> editPenalty(@RequestParam(value = "team") Integer idTeam, @PathVariable Integer code,
			@RequestBody Penalty penalty) {
		penalty.setCode(code);
		penalty = penaltyService.editPenalty(penalty, idTeam);
		return ResponseEntity.noContent().build();
	}

	/////////////////////////////////////////// DELETE
	/////////////////////////////////////////// ///////////////////////////////////////////
	/////// delete forever
	@DeleteMapping("/penalty/{code}")
	public ResponseEntity<Void> deletePenalty(@PathVariable Integer code) {
		penaltyService.deletePenalty(code);
		return ResponseEntity.noContent().build();
	}

	/////////////////////////////////////////// OTHER FUNCTIONS
	/////////////////////////////////////////// ///////////////////////////////////////////

	@PutMapping("team/penalty/complete/{code}")
	public ResponseEntity<Penalty> completePenalty(@PathVariable Integer code) {
		penaltyService.penaltyComplete(code);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("team/penalty/cancel/{code}")
	public ResponseEntity<Penalty> canceledPenalty(@PathVariable Integer code) {
		penaltyService.penaltyCanceled(code);
		return ResponseEntity.noContent().build();
	}

}
