package com.VelvetVista.VelvetVista_Resort.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookedRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    @Column(name= "Check_In_Date")
    private LocalDate checkInDate;
    @Column(name= "Check_Out_Date")
    private LocalDate checkOutDate;
    @Column(name= "guest_FullName")
    private String guestFullName;
    @Column(name= "guest_Email")
    private String guestEmail;
    @Column(name= "adults")
    private int NumOfAdults;
    @Column(name= "children")
    private int NumOfChildren;
    @Column(name= "total_guest")
    private int totalNumOfGuest;
    @Column(name= "confirmation_Code")
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "room_id")
    private Room room;


    public void CalculateTotalNumOfGuest(){
        this.totalNumOfGuest = this.NumOfAdults + NumOfChildren;
    }

    public void setNumOfAdults(int numOfAdults) {
        NumOfAdults = numOfAdults;
        CalculateTotalNumOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        NumOfChildren = numOfChildren;
        CalculateTotalNumOfGuest();
    }

    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
