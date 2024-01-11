package com.VelvetVista.VelvetVista_Resort.controller;

import com.VelvetVista.VelvetVista_Resort.exception.InvalidBookingRequestException;
import com.VelvetVista.VelvetVista_Resort.exception.ResourceNotFoundException;
import com.VelvetVista.VelvetVista_Resort.model.BookedRoom;
import com.VelvetVista.VelvetVista_Resort.model.Room;
import com.VelvetVista.VelvetVista_Resort.response.BookingResponse;
import com.VelvetVista.VelvetVista_Resort.response.RoomResponse;
import com.VelvetVista.VelvetVista_Resort.service.IBookingService;
import com.VelvetVista.VelvetVista_Resort.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final IBookingService bookingService;
    private final IRoomService roomService;

    @GetMapping("all-bookings")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings){
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }



    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode){
        try{
            BookedRoom booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse =getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        }
        catch(ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId,
                                         @RequestBody BookedRoom bookingRequest){
        try{
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok("Room Booked successfully ! your booking confirmation code is :"+confirmationCode);
        }
        catch(InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse room = new RoomResponse(
                                    theRoom.getId(),
                                    theRoom.getRoomType(),
                                    theRoom.getRoomPrice());
        return new BookingResponse(booking.getBookingId(),
                                    booking.getCheckInDate(),
                                    booking.getCheckOutDate(),
                                    booking.getGuestFullName(),
                                    booking.getGuestEmail(),
                                    booking.getNumOfAdults(),
                                    booking.getNumOfChildren(),
                                    booking.getTotalNumOfGuest(),
                                    booking.getBookingConfirmationCode(),
                                    room
                                    );
    }
}
