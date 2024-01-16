import React, { useState } from 'react'
import RoomCard from '../room/RoomCard'
import RoomPaginator from './RoomPaginator'
import { Button } from 'react-bootstrap'

const RoomSearchResult = ({results, onClearSearch}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [resultPerPage] = 3
    const totalResults = results.length()
    const totalPages = Math.ceil(totalResults / resultPerPage)

    const handlePageChange = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    const startIndex = (currentPage - 1) * resultPerPage
    const endIndex = startIndex + resultPerPage
    const paginatedResult = results.slice(startIndex, endIndex)


  return (
    <>
    {results.length > 0 ? (
        <>
            <h5 className="text-center mt-5">Search Results</h5>
                <Row>
                    {paginatedResult.map((room)=> (
                        <RoomCard key={room.id} room={room}/>
                    ))}
                </Row>

                <Row>
                    {totalResults > resultPerPage && (
                        <RoomPaginator currentPage={currentPage}
                                        totalPages={totalPages}   
                                        onPageChange={handlePageChange}  />       
                        
                    )}

                </Row>

        </>
    ): (
        <p></p>
    )}

    <Button
        variants= "secondary"
        onClick={onClearSearch}
    
    ></Button>

    </>
  )
}

export default RoomSearchResult