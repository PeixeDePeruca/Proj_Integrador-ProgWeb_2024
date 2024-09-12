import { NextApiRequest , NextApiResponse } from "next";
import { createGameC } from "../../Controller/gameController";

export default async (req:NextApiRequest , res:NextApiResponse) => {
    if( req.method != 'POST' ) {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const { name, releaseDate, imageURL, videoURL, description } = req.body;

    const response = await createGameC(name , releaseDate , description , imageURL , videoURL);

    return res.status(response.status).json( {message: response.message} );
}