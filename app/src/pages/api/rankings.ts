import { getRankings } from '@lib/config/collections';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { rankings, error } = await getRankings();
      if (error) throw new Error(error);
      return res.status(200).json({success: true, data: rankings})
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default handler;