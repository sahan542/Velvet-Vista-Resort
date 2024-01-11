import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useNavigate, useParams } from 'react-router-dom'
import moment from "moment"
import { Form, FormControl } from 'react-bootstrap'
import { type } from './../../../node_modules/moment/moment.d';

const BookingForm = () => {

    const[isValidated, setIsValidated] = useState(false)
    const[isSubmitted, setIsSubmitted] = useState(false)
    const[errorMessage, setErrorMessage] = useState("")
    const[roomPrice, setRoomPrice] = useState(0)
    const[booking, setBooking] = useState({
        guestName : "",
        guestEmail : "",
        checkInDate : "",
        checkOutDate : "",
        numberOfAdults : "",
        numberOfChildren : ""
    })

    const[roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const{roomId} = useParams()
    const navigate = useNavigate()


    const handleInputChange = (e) =>{
        const{name, value} = e.target 
        setBooking({...booking, [name]: value})
        setErrorMessage("")
    }

    const getRoomPriceById = async(roomId) =>{
        try{
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)

        }
        catch(error){
            throw new Error(error)
        }
    }

    useEffect(() =>{
        getRoomPriceById(roomId)
    }, [roomId])

    const calculatePayment = ()=>{
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate)
        const paymentPerDay = roomPrice ? roomPrice : 0
        return diffInDays * price
    }

    const isGuestCountValid = () =>{
        const adultCount = parseInt(booking.numberOfAdults)
        const childrenCount = parseInt(booking.numberOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckOutDateValid = () =>{
        if(!moment(booking.checkInDate) .isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage("Check-out date must come before Check-in date")
            return false
        }
        else{
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const form = e.currentTarget 
        if(form.checkValidity()=== false || !isGuestCountValid() || !isCheckOutDateValid()){
            e.stopPropagation()
        }
        else{
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }

    const handleBooking = async() =>{
        try{
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true)
            navigate("/", {state:{message : confirmationCode}})
        }
        catch(error){
            setErrorMessage(error.message)
            navigate("/", {state:{error : errorMessage}})
        }
    }

  return (
    <>
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card card-body mt-5">
                        <h4 className="card card-title">Reserve Room</h4>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="guestName"> 
                                    Full Name : 
                                </Form.Label>
                                <FormControl required type="text" id="guestName" name="guestName" value={booking.guestName} placeholder="Enter your Full Name" onChange={handleInputChange} />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter your Full Name
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="guestEmail"> 
                                    Email : 
                                </Form.Label>
                                <FormControl required type="email" id="guestEmail" name="guestEmail" value={booking.guestEmail} placeholder="Enter your Email" onChange={handleInputChange} />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter your Email Address
                                </Form.Control.Feedback>
                            </Form.Group>

                            <fieldset style={{border: "2px"}}>
                                <legend>Lodging Period</legend>
                                <div className="row">
                                    <div className="col-6">

                                        
                                    </div>
                                </div>
                            </fieldset>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )

}

export default BookingForm