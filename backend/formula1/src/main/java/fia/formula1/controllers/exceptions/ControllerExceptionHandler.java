package fia.formula1.controllers.exceptions;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import fia.formula1.services.exceptions.ObjectNotFoundException;
import fia.formula1.services.exceptions.DataIntegrityViolationException;

@ControllerAdvice
public class ControllerExceptionHandler {

  @ExceptionHandler(ObjectNotFoundException.class)
  public ResponseEntity<StandardError> objectNotFoundException(ObjectNotFoundException e, ServletRequest request) {

    Date data = new Date();
    SimpleDateFormat formatador = new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss");
    String dataFormatada = formatador.format(data);

    StandardError error = new StandardError(dataFormatada, HttpStatus.NOT_FOUND.value(), e.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<StandardError> objectNotFoundException(DataIntegrityViolationException e,
      ServletRequest request) {

    Date data = new Date();
    SimpleDateFormat formatador = new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss");
    String dataFormatada = formatador.format(data);

    StandardError error = new StandardError(dataFormatada, HttpStatus.BAD_REQUEST.value(), e.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

}
