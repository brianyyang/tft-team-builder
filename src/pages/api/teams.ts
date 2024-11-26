import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/server/mongodb';
import User from '@/server/models/User';
import Team, { ITeam } from '@/server/models/Team';
import { isDuplicateKeyError } from '@/server/utils/mongoErrorCodes';

type Data = {
  message?: string;
  teams?: ITeam[];
  team?: ITeam;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      const { query } = req;

      if (query.username && query.setNumber) {
        // fetch all teams for a given user by username
        try {
          const teams = await Team.find({
            user: query.username,
            setNumber: query.setNumber,
          });
          return res.status(200).json({ teams });
        } catch (error) {
          console.error('Error fetching teams by username:', error);
          return res.status(500).json({ message: 'Failed to fetch teams' });
        }
      } else if (query.teamId) {
        // fetch a specific team by its ID
        try {
          const team = await Team.findById(query.teamId);
          if (!team) {
            return res.status(404).json({ message: 'Team not found' });
          }
          return res.status(200).json({ team });
        } catch (error) {
          console.error('Error fetching team by ID:', error);
          return res.status(500).json({ message: 'Failed to fetch team' });
        }
      } else {
        // if no valid query parameters are provided, return an error
        return res.status(400).json({
          message:
            'Bad Request: Provide either username + set number or teamId',
        });
      }

    case 'POST': // create new team for user
      const { teamName, championIds, username, setNumber } = req.body;

      if (!teamName || !username || !Array.isArray(championIds) || !setNumber) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      try {
        let user = await User.findOne({ username: username });
        if (!user) {
          // create a new user record if not found
          user = new User({ username: username });
          await user.save();
        }

        const team = new Team({
          name: teamName,
          championIds,
          user: user,
          setNumber: setNumber,
        });
        const savedTeam = await team.save();

        return res
          .status(201)
          .json({ message: 'Team created successfully', team: savedTeam });
      } catch (error: any) {
        if (isDuplicateKeyError(error)) {
          return res
            .status(409)
            .json({ message: 'Team name already exists for this user' });
        }
        return res
          .status(500)
          .json({ message: 'Error creating team: ' + error.message });
      }

    case 'PATCH': // modify an existing team for a user
      try {
        const { teamId, teamName, championIds, username } = req.body;

        // check if the user exists
        let user = await User.findOne({ username: username });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // find the existing team by ID
        const team = await Team.findOne({ _id: teamId, user: user });

        if (!team) {
          return res
            .status(404)
            .json({ message: 'Team not found for this user' });
        }

        // update the team details
        team.name = teamName;
        team.championIds = championIds;
        await team.save();

        return res.status(200).json({ message: 'Team updated successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Failed to update team' });
      }

    default:
      // handle unsupported request methods
      res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
