import { NextApiRequest, NextApiResponse } from "next";
import { findUserByEmail } from "../../model/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Obter o userId da requisição
    const userId = req.cookies.userId; // Supondo que o userId esteja no cookie

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    // Buscar dados do usuário pelo userId
    const response = await findUserByEmail(userId);

    if (response) {
        return res.status(200).json({ message: "User found", data: response });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
};

