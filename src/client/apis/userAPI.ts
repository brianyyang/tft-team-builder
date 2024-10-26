import axios from 'axios';

const API_URL = '/api/users';

// Fetch a user by username
export const fetchUserByUsername = async (username: string) => {
  try {
    const response = await axios.get(API_URL, {
      params: { username },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};

// Create a new user
export const createUser = async (userData: { username: string }) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};
