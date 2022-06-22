import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

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

    const userEmail = session.user.email; // Getting user email directly from the logged in session
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection('users');
    const user = await usersCollection.findOne({email: userEmail});

    if(!user){ // Very strange, because we're getting the user email from the session logged in
        res.status(404).json({message: 'User not found!'});
        client.close();
        return;
    }

    const currentPassword = user.password;
    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
    if(!passwordsAreEqual){
        res.status(403).json({message: 'Old password does not match!'});
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(newPassword);
    const result = await usersCollection.updateOne(
        {email: userEmail}, // Query filter
        { $set: { password: hashedPassword} }// Parameters to be updated
    );

    client.close();
    res.status(200).json({message: 'Password updated!'});
}

export default handler;