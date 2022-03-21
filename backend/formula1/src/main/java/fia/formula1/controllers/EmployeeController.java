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

import fia.formula1.models.Employee;
import fia.formula1.services.EmployeeService;

@CrossOrigin
@RestController
@RequestMapping("formulaOne")
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  /////////////////////////////////////////// CREATE
  /////////////////////////////////////////// ///////////////////////////////////////////

  ////////// insert a new employee
  @PostMapping("/employee")
  public ResponseEntity<Employee> insertEmployee(@RequestParam(value = "role") Integer idRole,
      @RequestParam(value = "team", required = false) Integer idTeam,
      @RequestBody Employee employee) {
    employee = employeeService.insertEmployee(idRole, idTeam, employee);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/employee/{id}")
        .buildAndExpand(employee.getIdEmployee()).toUri();

    return ResponseEntity.created(uri).build();
  }

  /////////////////////////////////////////// READ
  /////////////////////////////////////////// ///////////////////////////////////////////

  /////// list all employees - actives and non actives
  @GetMapping("/employees")
  public List<Employee> showAll() {
    List<Employee> employee = employeeService.showAllEmployees();
    return employee;
  }

  /////// list all actives employees
  @GetMapping("/activesEmployees")
  public List<Employee> showAllActives() {
    List<Employee> employee = employeeService.showAllActivesEmployees();
    return employee;
  }

  /////// list one specific employee
  @GetMapping("/employee/{idEmployee}")
  public ResponseEntity<?> showOne(@PathVariable Integer idEmployee) {
    Employee employee = employeeService.showOneEmployee(idEmployee);
    return ResponseEntity.ok().body(employee);
  }

  ////// list all employees from one specific team
  @GetMapping("/employeesByTeam/{idTeam}")
  public List<Employee> showEmployeeByTeam(@PathVariable Integer idTeam) {
    List<Employee> employees = employeeService.showEmployeeByTeam(idTeam);
    return employees;
  }

  /////// list all employees associated with a team
  @GetMapping("/employeeWithTeam")
  public List<List> showEmployeeWithTeam() {
    List<List> employees = employeeService.showEmployeeWithTeam();
    return employees;
  }

  /////// list all employees that doesnt have a team
  @GetMapping("/employeesTeamNull")
  public List<Employee> showEmployeesByNull() {
    List<Employee> employees = employeeService.showEmployeeByNull();
    return employees;
  }

  /////// list all available employees
  @GetMapping("/availableEmployees")
  public List<Employee> availableEmployees() {
    List<Employee> employees = employeeService.availableEmployees();
    return employees;
  }

  /////////////////////////////////////////// UPDATE
  /////////////////////////////////////////// ///////////////////////////////////////////

  ////// edit a employee
  @PutMapping("/employee/{idEmployee}")
  public ResponseEntity<Employee> editEmployee(@RequestParam(value = "role") Integer idRole,
      @RequestParam(value = "team", required = false) Integer idTeam,
      @PathVariable Integer idEmployee, @RequestBody Employee employee) {
    employee.setIdEmployee(idEmployee);
    employee = employeeService.editEmployee(idRole, idTeam, employee);
    return ResponseEntity.noContent().build();
  }

  ////// edit a employee to leave it without team
  @PutMapping("/leaveTeam/employee/{idEmployee}")
  public ResponseEntity<Employee> leaveEmployeeWithoutTeam(@RequestParam(value = "role") Integer idRole,
      @PathVariable Integer idEmployee, @RequestBody Employee employee) {
    employee.setIdEmployee(idEmployee);
    employee = employeeService.leaveEmployeeWithoutTeam(idRole, idEmployee);
    return ResponseEntity.noContent().build();
  }

  /////////////////////////////////////////// DELETE
  /////////////////////////////////////////// ///////////////////////////////////////////
  /////// delete forever
  @DeleteMapping("/employee/{idEmployee}")
  public ResponseEntity<Void> deleteEmployee(@PathVariable Integer idEmployee) {
    employeeService.deleteEmployee(idEmployee);
    return ResponseEntity.noContent().build();
  }

  /////// soft delete
  @DeleteMapping("/softDeleteEmployee/{idEmployee}")
  public ResponseEntity<Void> softDeleteEmployee(@PathVariable Integer idEmployee) {
    employeeService.softDeleteEmployee(idEmployee);
    return ResponseEntity.noContent().build();
  }

}
