import { getRankings, getTeams } from '@lib/config/collections';
import Team from '@lib/config/models/team.model';
import { connectDB, getCollection } from '@lib/config/db';
import { NextResponse } from 'next/server';


const handler = async (req:any, res:any) => {
  // await connectDB();

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