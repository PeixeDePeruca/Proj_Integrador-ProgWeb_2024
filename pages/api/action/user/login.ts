import { NextApiRequest , NextApiResponse } from "next";
import { login } from "../../Controller/userController";

export default async (req:NextApiRequest , res: NextApiResponse) => {
    if (req.method != 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const{ email , password} = req.body;

    const response = await login(email , password);

    if ( response.status == 200 ) {
        return res.status( response.status ).json( {message: response.message , token: response.token} );
    }
    else{
        return res.status(response.status).json( {message: response.message} );
    }
}