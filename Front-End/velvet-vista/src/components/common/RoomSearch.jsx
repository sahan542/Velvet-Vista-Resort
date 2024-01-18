import React, { useState } from 'react'
import moment from 'moment'
import { getAvailableRooms } from '../utils/ApiFunctions'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import RoomTypeSelector from './RoomTypeSelector'
import RoomSearchResult from './RoomSearchResult'

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate : "",
        checkOutDate : "",
        roomType : ""
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        const checkInMoment = moment(searchQuery.checkInDate)
        const checkOutMoment = moment(searchQuery.checkOutDate)
        if(!checkInMoment.isValid() || !checkOutMoment.isValid()){
            setErrorMessage("Please Enter Valid date range")
            return
        }
        if(!checkOutMoment.isSameOrAfter(checkInMoment)){
            setErrorMessage("Check-In Date must come before Check-Out Date")
            return
        }
        setIsLoading(true)
        getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
        .then((response) => {
            setAvailableRooms(response.data)
            setTimeout(() => setIsLoading(false), 2000)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setIsLoading(false)
        })

    }

    const handleInputChange = (e) =>{
        const { name, value } = e.target
        const checkInDate = moment(searchQuery.checkInDate)
        const checkOutDate = moment(searchQuery.checkOutDate)
        if (checkInDate.isValid() && checkOutDate.isValid()){
            setErrorMessage("")
        }
    }

    const handleClearSearch = () =>{
        setSearchQuery({
            checkInDate : "",
            checkOutDate : "",
            roomType : ""
        })
        setAvailableRooms([])
    }

  return (
    <>
        <Container className="mt-5 mb-5 py-5 shadow">
            <Form onSubmit={handleSearch}>
                <Row className="justify-content-center">
                    <Col xs={12} md={3}>
                        <Form.Group controlId="checkIndate">
                            <Form.Label>Check-in date</Form.Label>
                            <Form.Control
                                type="date"
                                name="checkInDate"
                                value={searchQuery.checkInDate}
                                onChange={handleInputChange}
                                min={moment().format("YYYY-MM-DD")}
                                />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                        <Form.Group controlId='checkOutDate'>
                            <Form.Label>Check-out date</Form.Label>
                            <Form.Control
                                type="date"
                                name="checkOutDate"
                                value={searchQuery.checkOutDate}
                                onChange={handleInputChange}
                                min={moment().format("YYYY-MM-DD")}
                                />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                        <Form.Group>
                            <Form.Label>Room Type</Form.Label>
                            <div className="d-flex">
                                <RoomTypeSelector 
                                    handleRoomInputChange={handleInputChange} 
                                    newRoom={searchQuery}
                                />
                                <Button varient="secondary"
                                        type="submit"
                                        className="ml-2">Search</Button>
                            </div>
                            
                        </Form.Group>
                    </Col>


                </Row>
            </Form>

            {setIsLoading ? (
                <p className="mt-4">Finding available Rooms....</p>
            ): availableRooms ?(
                <RoomSearchResult results={availableRooms} onClearSearch={handleClearSearch}/>
            ):(
                <p>No Rooms Available for the selected dates and room type</p>
            )}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}

        </Container>

    </>
  )
}

export default RoomSearch