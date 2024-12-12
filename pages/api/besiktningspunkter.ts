import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { maskinTypId } = req.query;

    if (!maskinTypId) {
        return res.status(400).json({ error: 'maskinTypId is required' });
    }

    try {
        const besiktningsPunkter = await prisma.besiktningsPunkt.findMany({
            where: { MaskinTypId: Number(maskinTypId) },
        });
        res.status(200).json(besiktningsPunkter);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching besiktningspunkter' });
    }
}