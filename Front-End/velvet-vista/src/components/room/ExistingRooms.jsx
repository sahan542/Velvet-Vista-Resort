import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../utils/ApiFunctions'

const ExistingRooms = () => {
    const[rooms, setRooms] = useState([])
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
        }
    }

    useEffect(() => {
        if(selectedRoomtype === ""){
        setFilteredRooms(rooms)
        }
        else{
            const filtered = rooms.filter((room) => room.roomType === selectedRoomtype)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomtype])

  return (
    <div>ExistingRooms</div>
  )
}

export default ExistingRooms