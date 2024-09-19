import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db"; // Supondo que você tenha o Prisma configurado
import { checkToken } from "@/services/tokenConfig"; // Função que valida o token e decodifica

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obter o token de autenticação dos cookies
    const token = getCookie("authorization", { req, res });

    if (!token) {
      return res.status(401).json({ message: "Token não encontrado" });
    }

    // Verificar o token e decodificar para obter o ID do usuário
    const decodedToken = checkToken(token); // Suponha que o token contenha o userId

    if (!decodedToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const userId = decodedToken.userId; // Extraímos o userId do token decodificado

    // Buscar o usuário pelo ID no banco de dados e obter o e-mail
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true }, // Seleciona apenas o e-mail do usuário
    });

    // Retorna o e-mail do usuário
    return res.status(200).json({ email: user?.email });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar o e-mail" });
  }
}
