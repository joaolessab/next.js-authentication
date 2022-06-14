import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body;
        const { email, password } = data;

        if (
            !email || 
            !email.includes('@') || 
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

        const existingUser = await db.collection('users').findOne({email: email});

        if(existingUser){
            res.status(422).json({message: 'User exists already!'});
            client.close();
            return;
        }

        const hashedPassword = await hashPassword(password); // Needs to wait the result of the promise;

        const result = await db.collection('users').insertOne({
            email: email,
            password: hashedPassword // We should not store the plain password in our database
        });

        res.status(201).json({
            message: 'Created User!'
        });
        client.close();
    }
}

export default handler;