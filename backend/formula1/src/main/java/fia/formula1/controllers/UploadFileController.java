package fia.formula1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fia.formula1.models.Employee;
import fia.formula1.models.Team;
import fia.formula1.models.TeamLeader;
import fia.formula1.services.EmployeeService;
import fia.formula1.services.TeamLeaderService;
import fia.formula1.services.TeamService;
import fia.formula1.utils.UploadFileUtil;

@CrossOrigin
@RestController
@RequestMapping("formulaOne")
public class UploadFileController {

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private TeamLeaderService teamLeaderService;

	@Autowired
	private TeamService teamService;

	@PostMapping("/employee/send/{idEmployee}")
	public ResponseEntity<String> sendDataEmployee(@PathVariable Integer idEmployee, MultipartFile photo,
			@RequestParam("fileName") String fileName) {

		try {
			// INSIDE "" GOES THE PATH TO THE ASSETS PROJECT FOLDER
			String uploadDir = "INSIDE HERE GOES THE PATH TO THE ASSETS PROJECT FOLDER";

			// INSIDE "" GOES THE PATH FROM THE ASSETS UNTIL THE FILE NAME
			String dirPlusFileName = "INSIDE HERE GOES THE PATH FROM THE ASSETS UNTIL THE FILE NAME" + "/" + fileName;

			Employee employee = employeeService.savePhoto(idEmployee, dirPlusFileName);

			UploadFileUtil.saveFile(uploadDir, fileName, photo);
			System.out.println("Deu certo. " + dirPlusFileName);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			throw new RuntimeException("Erro de IO: " + e.getMessage());
		}

	}

	@PostMapping("/teamLeader/send/{idTeamLeader}")
	public ResponseEntity<String> sendDataTeamLeader(@PathVariable Integer idTeamLeader, MultipartFile photo,
			@RequestParam("fileName") String fileName) {
		try {
			// INSIDE "" GOES THE PATH TO THE ASSETS PROJECT FOLDER
			String uploadDir = "INSIDE HERE GOES THE PATH TO THE ASSETS PROJECT FOLDER";

			// INSIDE "" GOES THE PATH FROM THE ASSETS UNTIL THE FILE NAME
			String dirPlusFileName = "INSIDE HERE GOES THE PATH FROM THE ASSETS UNTIL THE FILE NAME" + "/" + fileName;

			TeamLeader teamLeader = teamLeaderService.savePhoto(idTeamLeader, dirPlusFileName);

			UploadFileUtil.saveFile(uploadDir, fileName, photo);

			System.out.println("Deu certo. " + dirPlusFileName);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			throw new RuntimeException("Erro de IO: " + e.getMessage());
		}

	}

	@PostMapping("/team/send/{idTeam}")
	public ResponseEntity<String> sendDataTeam(@PathVariable Integer idTeam, MultipartFile photo,
			@RequestParam("fileName") String fileName) {
		try {
			// INSIDE "" GOES THE PATH TO THE ASSETS PROJECT FOLDER
			String uploadDir = "INSIDE HERE GOES THE PATH TO THE ASSETS PROJECT FOLDER";

			// INSIDE "" GOES THE PATH FROM THE ASSETS UNTIL THE FILE NAME
			String dirPlusFileName = "INSIDE HERE GOES THE PATH FROM THE ASSETS UNTIL THE FILE NAME" + "/" + fileName;

			Team team = teamService.savePhoto(idTeam, dirPlusFileName);

			UploadFileUtil.saveFile(uploadDir, fileName, photo);

			System.out.println("Deu certo. " + dirPlusFileName);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			throw new RuntimeException("Erro de IO: " + e.getMessage());
		}

	}

}
