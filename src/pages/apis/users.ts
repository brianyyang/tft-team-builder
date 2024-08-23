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
            res.status(200).json(user);
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        } else {
          res.status(400).json({ error: 'No username given' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to load user' });
      }
      break;
    case 'POST':
      try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
