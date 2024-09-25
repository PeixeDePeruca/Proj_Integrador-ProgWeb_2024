import { prisma } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import { findUserByEmail } from "../../model/user";

export default async function listFavorites(req: NextApiRequest, res: NextApiResponse) {
    const { email }: any = req.query;
    try {

        const user = await findUserByEmail(email);

        if (user == undefined) {
            res.status(404).json({ message: 'User not found' });
        }

        const favorites = await prisma.favorite.findMany({
            where: {
                userId: Number(user.id),
            },
            include: {
                game: true,
            },
        });
        res.status(200).json({ favorites });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar favoritos.', error });
    }
}
