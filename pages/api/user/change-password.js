import { getSession } from "next-auth/client";

// /api/user/change-password
async function handler(req, res){
    if(req.method !== 'PATCH'){
        return;
    }

    // Piece of code that will protect our API routes against all not authenticated users!
    const session = await getSession({req: req});
    if(!session){
        res.status(401).json({message: 'Not authenticated!'});
        return;
    }
}

export default handler;