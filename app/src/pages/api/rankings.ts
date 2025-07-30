import { getRankings } from '@lib/config/collections';

const handler = async (req:any, res:any) => {
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