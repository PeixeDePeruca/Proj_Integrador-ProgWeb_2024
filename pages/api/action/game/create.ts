import { NextApiRequest , NextApiResponse } from "next";
import { createGameC } from "../../Controller/gameController";

export default async (req:NextApiRequest , res:NextApiResponse) => {
    if( req.method != 'POST' ) {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const { name, releaseDate, imageURL, videoURL, description , download } = req.body;

    const response = await createGameC(name , releaseDate , description , imageURL , videoURL, download);

    return res.status(response.status).json( {message: response.message} );
}