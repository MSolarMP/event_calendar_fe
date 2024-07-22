import axios from 'axios';

const API_URL = 'http://localhost:3001/organisers';

export const getAllEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching organisers:', error);
        throw error;
    }
};
