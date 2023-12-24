package com.VelvetVista.VelvetVista_Resort.service;

import com.VelvetVista.VelvetVista_Resort.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public interface IRoomService {
    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice);
}
