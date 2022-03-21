package fia.formula1.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import fia.formula1.models.Employee;
import fia.formula1.models.Role;
import fia.formula1.models.Team;
import fia.formula1.repositories.EmployeeRepository;
import fia.formula1.services.exceptions.ObjectNotFoundException;

@Service
public class EmployeeService {

  // injeção de dependência
  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  private TeamService teamService;

  @Autowired
  private RoleService roleService;

  /////////////////////////////////////////// CREATE
  /////////////////////////////////////////// ///////////////////////////////////////////
  // service to insert One Employee
  public Employee insertEmployee(Integer idRole, Integer idTeam, Employee employee) {
    employee.setIdEmployee(null);
    employee.setEmpActive(true);
    Role role = roleService.showOneRole(idRole);
    employee.setRole(role);
    if (idTeam != null) {
      Team team = teamService.showOneTeam(idTeam);
      employee.setTeam(team);
    }
    return employeeRepository.save(employee);
  }

  /////////////////////////////////////////// READ
  /////////////////////////////////////////// ///////////////////////////////////////////

  // service to show All - Active and non Active
  public List<Employee> showAllEmployees() {
    return employeeRepository.findAll();
  }

  ///////////// service to show All Active
  public List<Employee> showAllActivesEmployees() {
    return employeeRepository.fetchEmployeeActive();
  }

  // service to show All Employees who have a team
  public List<List> showEmployeeWithTeam() {
    List<List> employees = employeeRepository.employeesRightTeam();
    return employees;
  }

  // service to show the employees associated with one specific team
  public List<Employee> showEmployeeByTeam(Integer idTeam) {
    List<Employee> employees = employeeRepository.employeesByTeam(idTeam);
    return employees;
  }

  // service to show All Employees who doesnt have a team
  public List<Employee> showEmployeeByNull() {
    List<Employee> employees = employeeRepository.fetchEmployeeByNull();
    return employees;
  }

  // service to show One Employee
  public Employee showOneEmployee(Integer idEmployee) {
    Optional<Employee> employee = employeeRepository.oneEmployeeActive(idEmployee);
    return employee
        .orElseThrow(() -> new ObjectNotFoundException("Object not registered, the searched id was: " + idEmployee));
  }

  // service to show All Employees available
  public List<Employee> availableEmployees() {
    List<Employee> employees = employeeRepository.availableEmployees();
    return employees;
  }

  /////////////////////////////////////////// UPDATE
  /////////////////////////////////////////// ///////////////////////////////////////////

  // service to edit Employee
  public Employee editEmployee(Integer idRole, Integer idTeam, Employee employee) {
    Role role = roleService.showOneRole(idRole);
    employee.setRole(role);
    if (idTeam != null) {
      Team team = teamService.showOneTeam(idTeam);
      employee.setTeam(team);
    }
    return employeeRepository.save(employee);
  }

  // service to leave employee without team
  public Employee leaveEmployeeWithoutTeam(Integer idRole, Integer idEmployee) {
    Role role = roleService.showOneRole(idRole);
    Employee employee = showOneEmployee(idEmployee);
    employee.setRole(role);
    employee.setTeam(null);
    return employeeRepository.save(employee);
  }

  /////////////////////////////////////////// DELETE
  /////////////////////////////////////////// ///////////////////////////////////////////

  // service to delete forever
  public void deleteEmployee(Integer idEmployee) {
    try {
      employeeRepository.deleteById(idEmployee);
    } catch (DataIntegrityViolationException e) {
      throw new fia.formula1.services.exceptions.DataIntegrityViolationException(
          "This employee cannot be deleted.");
    }
  }

  // service to soft delete
  public void softDeleteEmployee(Integer idEmployee) {
    Employee employee = showOneEmployee(idEmployee);
    employee.setRole(null);
    employee.setTeam(null);
    employee.setEmpActive(false);
    employeeRepository.save(employee);
  }

  //////////////// FUNCTION TO SAVE PHOTO
  public Employee savePhoto(Integer idEmployee, String photoPath) {
    Employee employee = showOneEmployee(idEmployee);
    employee.setEmpPhoto(photoPath);
    return employeeRepository.save(employee);
  }

  //////// FUNCTION TO SET TEAM NULL OF AN EMPLOYEES LIST
  public void employeesSetTeamNull(Integer idTeam) {
    Team team = teamService.showOneTeam(idTeam);
    if (team.getEmployee() != null) {
      List<Employee> employeesRelated = team.getEmployee();
      employeesRelated.forEach(res -> {
        Employee employee = showOneEmployee(res.getIdEmployee());
        employee.setTeam(null);
        employeeRepository.save(employee);
      });
    }

  }

}
