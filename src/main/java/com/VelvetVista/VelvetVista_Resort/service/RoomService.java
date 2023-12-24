package com.VelvetVista.VelvetVista_Resort.service;

import com.VelvetVista.VelvetVista_Resort.model.Room;
import com.VelvetVista.VelvetVista_Resort.repository.RoomRepository;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.math.BigDecimal;
import java.sql.Blob;

public class RoomService implements IRoomService {
    private RoomRepository
    @Override
    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if(!file.isEmpty){
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(Blob photo);
        }

        return null;
    }
}
