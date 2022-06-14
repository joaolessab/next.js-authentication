import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

// It creates a handler here
export default NextAuth({
    session: {
        jwt: true
    },
    // We can use many different ones here
    providers: [
        // Credentials brings our own custom Credentials
        Providers.Credentials({
            async authorize(credentials){
                const client = connectToDatabase();

                const usersCollection = client.db().collection('users');
                const user = await usersCollection.findOne({email: credentials.email});

                if(!user){
                    client.close();
                    throw new Error('No user found!'); // When you thrown a new error inside this library, it will redirect the browser to another page by default
                }

                const isValid = await verifyPassword(credentials.password, user.password);
                if (!isValid){
                    client.close();
                    throw new Error('Could not log you in!');
                }

                client.close();
                return{ email: user.email }; // DO NOT INCLUDE THE USER PASSWORD HERE! NEVER!
            }
        })
    ]
});