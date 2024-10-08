import { prisma } from "@/db";

export async function createGame(_name: string, _releaseDate: string, _imageURL: string, _videoURL: string, _description: string) {
    const game = await prisma.game.create({
        data: {
            name: _name,
            releaseDate: _releaseDate,
            imageURL: _imageURL,
            videoURL: _videoURL,
            description: _description
        }
    });

    return game;
}

export async function findGameByName(_name: string) {
    const game = await prisma.game.findUnique({
        where: {
            name: _name
        },
        include: {
            ratings: {
                include: {
                    user: true
                }
            }
        }
    });

    return game;
}

export async function selectGames() {
    const game = await prisma.game.findMany();

    return game;
}
