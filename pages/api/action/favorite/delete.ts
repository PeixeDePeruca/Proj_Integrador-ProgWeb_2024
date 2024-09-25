import { prisma } from "@/db";

export default async function handler(req:any, res:any) {
  if (req.method === 'DELETE') {
    const { userId, gameId } = req.body;
    try {
      await prisma.favorite.delete({
        where: {
          userId_gameId: {
            userId,
            gameId,
          },
        },
      });
      res.status(200).json({ message: 'Favorito removido com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover favorito' });
    }
  } else {
    // Método não permitido
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
