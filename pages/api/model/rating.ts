import { prisma } from "@/db";


export async function createRatingModel( _value:number , _comment:string , _userId:number , _gameId:number ) {
    const rating = await prisma.rating.create({
        data: {
            value: _value,
            comment: _comment,
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

    return rating;
}

export async function findRatingByUser(_userId:number , _gameId:number) {
    const rating = await prisma.rating.findFirst({
        where: {
            userId: _userId,
            gameId: _gameId
        }
    });

    return rating;
}

export async function updateRatingModel(_id:number , _value:number , _comment:string) {
    const rating = await prisma.rating.update({
        where: {
            id: _id
        },
        data: {
            value: _value,
            comment: _comment
        }
    });

    return rating;
}

export async function deleteRatingModel(_id:number) {
    const rating = await prisma.rating.delete({
        where: {
            id: _id
        }
    });

    return rating;
}