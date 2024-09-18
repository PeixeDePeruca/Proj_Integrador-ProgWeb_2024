import { findGameByName } from "../model/game";
import { createRatingModel , updateRatingModel, findRatingByUser , deleteRatingModel } from "../model/rating";
import { findUserByEmail, findUserByUsername } from "../model/user";

export async function createRating( _value:number, _email:string , _gameName:string , _comment = "" ) {
    try {
        const userByEmail = await findUserByEmail(_email);
        
        if ( userByEmail == undefined ) {
            return { status: 404, message: 'User not found' };
        }

        const gameByName = await findGameByName(_gameName);

        if ( gameByName == undefined ) {
            return { status: 404, message: 'Game not found' };
        }

        // Verificar se o usuário já possui uma avaliação nesse filme
        const ratingByUser = await findRatingByUser(userByEmail.id , gameByName.id);

        if ( ratingByUser != undefined ) {
            const updateRating = await updateRatingModel(ratingByUser.id , _value , _comment);

            return { status: 200, message: 'Rating updated' , data: updateRating }
        }

        const response = await createRatingModel(_value, _comment , userByEmail.id , gameByName.id);

        return { status: 201, message: 'Rating created', data: response };

    }
    catch (err) {
        return { status: 500, message: 'Something went wrong' };
    }
}


export async function deleteRating(_email:string , _gameName:string) {
    try {
        const userByName = await findUserByEmail(_email);

        if ( userByName == undefined ) {
            return { status: 404 , message: 'User not found' };
        }

        const gameByName = await findGameByName(_gameName);

        if ( gameByName == undefined ) {
            return { status: 404 , message: 'Game not found' };
        }

        const ratingByUser = await findRatingByUser(userByName.id , gameByName.id);

        if ( ratingByUser == undefined ) {
            return { status:404 , message: 'Rating not found' };
        }

        const response = await deleteRatingModel(ratingByUser.id);

        return { status: 200 , message: 'Rating deleted' , data: response };

    }
    catch (err) {
        return { status: 500, message: 'Something went wrong' };
    }
}