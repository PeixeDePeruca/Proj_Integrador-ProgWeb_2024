import { prisma } from "@/db";

export default async function createFavoriteModel(_userId: number, _gameId: number) {
    const favorite = await prisma.favorite.create({
        data: {
            user: {
                connect: {
                    id: _userId
                }
            },
            game: {
                connect: {
                    id: _gameId
                }
            }
        }
    });

    return favorite;
}

export async function listFavoriteModel(_userId:number , _gameId:number) {
    const favorite = await prisma.favorite.findMany({
        where: {
            userId: _userId,
            gameId: _gameId
        },
        include: {
            game: true,
            user: true,
            }
    });

    return favorite;
}

export async function deleteFavoriteModel(_id:number) {
    const favorite = await prisma.favorite.delete({
        where:{
            id: _id
        } 
    });

    return favorite;
}