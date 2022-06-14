import { connectToDatabase } from '../../../lib/db';

async function handler(){
    const client = await connectToDatabase();
    const db = client.db();
}

export default handler;