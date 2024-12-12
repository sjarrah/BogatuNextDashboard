import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { maskinTypId } = req.query;

    if (!maskinTypId) {
        return res.status(400).json({ error: 'maskinTypId is required' });
    }

    try {
        const besiktningsResultat = await prisma.besiktningsResultat.findMany({
            where: { maskinId: Number(maskinTypId) },
        });
        res.status(200).json(besiktningsResultat);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching besiktningsresultat' });
    }
}