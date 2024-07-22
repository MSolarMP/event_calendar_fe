import axios from 'axios';

const API_URL = 'http://localhost:3001/category';

export const getAllCategorys = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching categorys:', error);
        throw error;
    }
};
