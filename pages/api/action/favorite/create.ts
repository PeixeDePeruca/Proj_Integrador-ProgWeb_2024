import { prisma } from "@/db";
import { NextApiRequest , NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, gameId } = req.body;
    try {
      const favorite = await prisma.favorite.create({
        data: {
          userId,
          gameId,
        },
      });
      res.status(201).json({ message: 'Favorito adicionado com sucesso!', favorite });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar favorito' });
    }
  } else {
    // Método não permitido
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
