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