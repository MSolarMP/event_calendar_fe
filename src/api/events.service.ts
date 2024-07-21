// eventService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/events';

export const getAllEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

export const createEvent = async (eventData: any) => {
    try {
        const response = await axios.post(API_URL, eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};
