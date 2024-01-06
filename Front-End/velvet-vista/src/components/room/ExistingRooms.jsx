import React, { useEffect, useState } from 'react'
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa"
import { Link } from 'react-router-dom';

const ExistingRooms = () => {
	const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "" }])
    const[currentPage, setCurrentPage] = useState(1)
    const[roomsPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredRooms, setFilteredRooms] = useState([])
    const[selectedRoomtype, setSelectedRoomType] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async () =>{
        setIsLoading(true)
        try{
            const result = await getAllRooms()
            setRooms(result)
            setIsLoading(false)

        }
        catch(error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(selectedRoomtype === ""){
        setFilteredRooms(rooms)
        }
        else{
            const filteredRooms = rooms.filter((room) => room.room.roomType === selectedRoomtype)
            setFilteredRooms(filteredRooms)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomtype])

const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber)
}

const handleDelete = async(roomId) =>{
    try{
        const result = await deleteRoom(roomId)
        if(result === ""){
            setSuccessMessage(`Room No ${roomId} was deleted`)
            fetchRooms()
        }
        else{
            console.error(`Error Deleting Room : ${result.message}`)
        }
    }
    catch(error){
        setErrorMessage(error.message)
    }
    setTimeout(() =>{
        setSuccessMessage("")
        setErrorMessage("")
    }, 3000)
}

const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) =>{
    const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
    return Math.ceil(totalRooms / roomsPerPage)
}

const indexOfLastRoom = currentPage * roomsPerPage
const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)



  return (
    <>
    {isLoading ? (
        <p>loading Existing Rooms</p>
    ): (
        <>
        <section className='mt-5 mb-5 container'>
            <div className='d flex justify-content-center mb-3 mt-5'>
                <h2>Existing Rooms</h2>
            </div>

            <Col md={6} className='mb-3 mb-md-0'>
                <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
            </Col>

            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>Room Type</th>
                        <th>Room Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRooms.map((room) => (
                    <tr key={room.id} className='text-center'>
                        <td>{room.id}</td>
                        <td>{room.roomType}</td>
                        <td>{room.roomPrice}</td>
                        <td className="gap-2">
                            <Link to={`/edit-room/${room.id}`}>
                                <span className="btn btn-info btn-sm">
                                    <FaEye />
                                </span>
                                <span className="btn btn-warning btn-sm">
                                    <FaEdit />
                                </span>
                            </Link>

                            <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(room.id)}>

                                <FaTrashAlt />
                            </button>
                        </td>
                    </tr>
                    ))}

                </tbody>
            </table>
            <RoomPaginator currentPage={currentPage} totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
            onPageChange={handlePaginationClick}
            />

            


        </section>
        </>
    )}
    
    
    </>
  )
}

export default ExistingRooms