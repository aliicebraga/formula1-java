package fia.formula1.controllers.exceptions;

public class StandardError {

  ////////// atributos
  //// horario
  private String timestamp;
  //// status
  private Integer status;
  /// mensagem
  private String error;

  /////// como ela é uma subclasse , precisa-se de um constructor
  ////// source -> generate constructor from fields
  public StandardError(String timestamp, Integer status, String error) {
    super();
    this.timestamp = timestamp;
    this.status = status;
    this.error = error;
  }

  ////////// getters and setters

  public String getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(String timestamp) {
    this.timestamp = timestamp;
  }

  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public String getError() {
    return error;
  }

  public void setError(String error) {
    this.error = error;
  }

}
