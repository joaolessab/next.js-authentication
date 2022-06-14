import { connectToDatabase } from '../../../lib/db';

async function handler(req, res){
    const data = req.body;
    const { email, password } = data;

    if (
        !email || 
        !email.include('@') || 
        !password || 
        password.trim().length < 7
    ){
        res
            .status(422)
            .json({ 
                message: 'Invalid input! Password should also be at least 7 characteres long.' 
            });
        return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    db.colletion('users').insertOne({
        email: email,
        password: password // We should not store the plain password in our database
    });
}

export default handler;