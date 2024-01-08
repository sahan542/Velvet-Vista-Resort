import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8088',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// Define the endpoint for adding a new room
const endpoint = '/rooms/add/new-room';

/* This function adds a new room to the database */

export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    try {
        const response = await api.post(endpoint, formData);
        if (response.status === 201) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error("Error adding a new room.");
    }
}


/* This function gets all room types from the database */

export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching room types.");
    }
}


/* This function gets all rooms from the database */

export async function getAllRooms() {
    try {
      const result = await api.get("/rooms/all-rooms")
      return result.data
    } catch (error) {
      throw new Error("Error fetching rooms")
    }
  }

/*This function deletes Room by Id from database */
  export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data

    }
    catch(error){
        throw new Error(`Error Deleting Room ${error.message}`)
    }
  }

  /*This function Update Room by Id from database */
  export async function updateRoom(roomId, roomData) {
	const formData = new FormData()
	formData.append("roomType", roomData.roomType)
	formData.append("roomPrice", roomData.roomPrice)
	formData.append("photo", roomData.photo)
	const response = await api.put(`/rooms/update/${roomId}`, formData)
	return response;
}

   /*This function gets a Room by Id */

  export async function getRoomById(roomId){
    try{
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    }
    catch(error){
        throw new Error(`Error fetching room ${error.message}`)
    }
  }



