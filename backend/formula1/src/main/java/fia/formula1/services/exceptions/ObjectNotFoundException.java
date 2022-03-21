package fia.formula1.services.exceptions;

public class ObjectNotFoundException extends RuntimeException {
  /////// adiciona uma versão para a plicação
  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  /////// como ela é uma subclasse , precisa-se de um constructor
  ////// source -> generate constructor from superClass

  public ObjectNotFoundException(String message, Throwable cause) {
    super(message, cause);
    // TODO Auto-generated constructor stub
  }

  public ObjectNotFoundException(String message) {
    super(message);
    // TODO Auto-generated constructor stub
  }

}
