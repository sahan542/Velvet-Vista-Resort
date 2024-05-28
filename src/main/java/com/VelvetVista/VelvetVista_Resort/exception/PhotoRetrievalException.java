package com.VelvetVista.VelvetVista_Resort.exception;

import java.sql.SQLException;

public class PhotoRetrievalException extends RuntimeException {
    public PhotoRetrievalException(String message) {
        super(message);
    }
}
    //public PhotoRetrievalException(String message, SQLException e) {
    //    super(message);
  //  }