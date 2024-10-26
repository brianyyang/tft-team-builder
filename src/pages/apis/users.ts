import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/server/mongodb';
import User from '@/server/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const { username } = req.query;
        if (username) {
          // Fetch a user by username
          const user = await User.findOne({ username }).exec();
          if (user) {
            return res.status(200).json(user);
          } else {
            return res.status(404).json({ error: 'User not found' });
          }
        } else {
          return res.status(400).json({ error: 'No username given' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Failed to load user' });
      }
    case 'POST':
      try {
        const user = new User(req.body);
        await user.save();
        return res.status(201).json(user);
      } catch (error) {
        return res.status(400).json({ error: 'Failed to create user' });
      }
    default:
      // handle unsupported request methods
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
