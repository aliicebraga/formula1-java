package fia.formula1.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fia.formula1.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

  // query to know which employees are related to each team
  @Query(value = "SELECT * FROM employee WHERE id_team = :id_team and emp_active is true", nativeQuery = true)
  List<Employee> employeesByTeam(Integer id_team);

  // INNER JOIN from two tables - employee and team
  @Query(value = "SELECT employee.id_employee, employee.emp_name, employee.emp_photo,employee.id_role,employee.emp_birth,employee.emp_contact,employee.emp_nationality,employee.emp_wage,employee.id_team,team.team_name, team.team_logo FROM team right JOIN employee ON employee.id_team = team.id_team WHERE employee.emp_active is true order by emp_name;", nativeQuery = true)
  List<List> employeesRightTeam();

  // query to know which employee does not have a team
  @Query(value = "SELECT * FROM employee WHERE id_team is null and emp_active is true", nativeQuery = true)
  List<Employee> fetchEmployeeByNull();

  // query to show only actives employees
  @Query(value = "SELECT * FROM employee WHERE emp_active is true order by emp_name", nativeQuery = true)
  List<Employee> fetchEmployeeActive();

  @Query(value = "SELECT * FROM employee WHERE emp_active is true and id_team is null order by emp_name", nativeQuery = true)
  List<Employee> availableEmployees();

  @Query(value = "SELECT * FROM employee WHERE id_employee = :id_employee and emp_active is true", nativeQuery = true)
  Optional<Employee> oneEmployeeActive(Integer id_employee);

}
