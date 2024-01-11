import moment from 'moment'
import React, { useState } from 'react'

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numOfDays = checkOutDate.diff(checkInDate, "days")
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
  return (
    <div>BookingSummary</div>
  )
}

export default BookingSummary