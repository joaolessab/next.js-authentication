// File that will help us to stablish a connection with our database
import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://joaolessab:fIL4sMMvgDxFBLSH@cluster0.1euve.mongodb.net/auth-demo?retryWrites=true&w=majority'
  );

  return client;
}