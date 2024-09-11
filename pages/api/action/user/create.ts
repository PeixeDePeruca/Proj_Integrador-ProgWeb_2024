import { NextApiRequest , NextApiResponse } from "next";
import { CreateUserC } from "../../Controller/userController";

export default async (req:NextApiRequest , res: NextApiResponse) => {
    if (req.method != 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const{ name , email , username , password , cPassword } = req.body;

    const response = await CreateUserC(name, email , username , password , cPassword);

    return res.status(response.status).json( {message: response.message} );
}