// /api/action/favorite.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return addFavorite(req, res);
    case 'DELETE':
      return removeFavorite(req, res);
    case 'GET':
      return listFavorites(req, res);
    default:
      res.setHeader('Allow', ['POST', 'DELETE', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function addFavorite(req: NextApiRequest, res: NextApiResponse) {
  const { userId, gameId } = req.body;
  try {
    const favorite = await prisma.favorite.create({
      data: {
        userId: Number(userId),
        gameId: Number(gameId),
      },
    });
    res.status(201).json({ message: 'Favorito adicionado!', favorite });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar favorito.', error });
  }
}

async function removeFavorite(req: NextApiRequest, res: NextApiResponse) {
  const { userId, gameId } = req.body;
  try {
    await prisma.favorite.delete({
      where: {
        userId_gameId: {
          userId: Number(userId),
          gameId: Number(gameId),
        },
      },
    });
    res.status(200).json({ message: 'Favorito removido!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover favorito.', error });
  }
}

async function listFavorites(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: Number(userId),
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
