import { NextApiRequest , NextApiResponse } from "next";
import { findGameByNameC } from "../../Controller/gameController";

export default async ( req:NextApiRequest , res:NextApiResponse ) => {
    if ( req.method != 'GET' ) {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const {name}:any = req.query;

    
    const response = await findGameByNameC(name);

    if ( response.status == 200 ) {
        return res.status(response.status).json( { message: response.message , data: response.data } )
    }
    else {
        return res.status(response.status).json( { message: response.message } )
    }
}