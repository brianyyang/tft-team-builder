import { Team } from '@/types/team';
import axios from 'axios';

const API_URL = '/api/teams';

// create a new team for a user
export const createTeam = async (team: Team, username: string) => {
  const teamData = {
    teamName: team.name,
    championIds: team.champions.map((champion) => champion.id),
    username: username,
    setNumber: team.setNumber,
  };
  try {
    const response = await axios.post(API_URL, teamData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create team');
  }
};

// update existing team by ID for user
export const updateTeam = async (team: Team, username: string) => {
  const teamData = {
    teamId: team.id,
    teamName: team.name,
    championIds: team.champions.map((champion) => champion.id),
    username: username,
  };
  try {
    const response = await axios.patch(API_URL, teamData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update team');
  }
};

// retrieve team by team ID
export const getTeamById = async (teamId: string) => {
  try {
    const response = await axios.get(`${API_URL}?teamId=${teamId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve team');
  }
};

// retrieve all teams for given user and a set number
export const getTeamsByUsername = async (
  username: string,
  setNumber: number
) => {
  try {
    const response = await axios.get(
      `${API_URL}?username=${username}&setNumber=${setNumber}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to retrieve teams'
    );
  }
};
