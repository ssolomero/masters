import { getTeams } from '@lib/config/collections';
import { connectDB } from '@lib/config/db';
import Team from '@lib/config/models/team.model';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'GET') {
    try {
      const { teams, error } = await getTeams();
      if (error) throw new Error(error);
      return res.status(200).json({success: true, data: teams})
    } catch (error) {
      return res.status(500).json(error);
    }
  } 

  if (req.method === 'POST') {
    try {
      await connectDB()
      const team = req.body;
      const newTeam = new Team(team);
      await newTeam.save();
      res.status(201).json({success: true, data: team})
    } catch (error) {
      console.error(error);
      res.status(500).json({success: false, message: "Server Error"});
    }
  }
}



export default handler;