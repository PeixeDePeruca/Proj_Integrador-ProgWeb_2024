import { createGame , findGameByName , selectGames } from "../model/game";

export async function createGameC(_name:string , _releaseDate: string, _description:string , _imageURL="" , _videoURL="" ) {
    try{
        const gameByName = await findGameByName(_name);

        if ( gameByName != undefined ) {
            return {status: 400 , message: 'Name already registered'};
        }

        const response = await createGame(_name , _releaseDate , _imageURL , _videoURL , _description);

        return { status: 201 , message: 'Game created' , data: response };
    }
    catch(err){
        return { status: 201, message: 'Somenthing went wrong' };
    }
}

export async function findGameByNameC(name: string) {
    try {
        const gameByName = await findGameByName(name);

        if ( gameByName == undefined) {
            return { status: 404, message: 'Game not found' };
        }
        else {
            return { status: 200, message: 'Game found', data: gameByName };
        }

    }
    catch (err) {
        return { status: 500, message: 'Something went wrong' };
    }
}



export async function selectGameC() {
    try {
        const game = await selectGames();

        return { status: 200, message: 'Select games', data: game };
    }
    catch(err){
        return { status: 500, message: 'Something went wrong' };
    }
}