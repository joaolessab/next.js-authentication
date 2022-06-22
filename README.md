# Next.js Authentication (using NextAuth.js) 

<div align="center">
  <img src="https://raw.githubusercontent.com/joaolessab/next.js-authentication/main/repo-media/logo.png" width="600">
</div>

## Repository Menu
1. [How do I run this project, João?](https://github.com/joaolessab/next.js-authentication#how-do-i-run-this-project-jo%C3%A3o)
2. [How Authentication Works in General?](https://github.com/joaolessab/next.js-authentication#how-authentication-works-in-general)
3. [How Next.js handles Authentication](https://github.com/joaolessab/next.js-authentication#how-nextjs-handles-authentication)
4. [JSON Web Token](https://github.com/joaolessab/next.js-authentication#json-web-token)
5. [Next Auth - Library used to handle Next.js Authentication easily](https://github.com/joaolessab/next.js-authentication#next-auth---library-used-to-handle-nextjs-authentication-easily)
6. [Database + API](https://github.com/joaolessab/next.js-authentication#database--api)
7. [Extra: Starting with Next.js from Scratch](https://github.com/joaolessab/next.js)
8. [Extra: Deploying Next.js Apps](https://github.com/joaolessab/next.js-authentication#extra-deploying-nextjs-apps)

## How do I run this project, João?
1. Install the package dependencies:
```bash
npm install
```

2. Then, run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## How Authentication Works in General?
1. A Client (Browser) wants to get access into Server information - connected to a Database;
2. But it needs a request telling the User Credentials;
3. A response True is not enough to then access protected resourcers (API Endpoints) - we need this proof (credentials);
4. A fake credential can be sent, but we have some mechanisms that we can use to make this safe:

<b>4.1 Server-side Sessions:</b>
- Store unique identifier on server, send same identifier to client;
- Client sends identifier along with the API requests to protect resources;
- Server always extracts this identifier to grant or deny access to the resources;
- When it's stored in the Client-Side, it's stored as a Cookie typically;
- That cookie can be configured to be not access through JavaScript to prevent agains cross-site scripting attacks, and that's readable only from the server when it's attached to outgoing requests;
- Even if it would be accessible through JavaScript, you should be protecting against cross-site scriptig attacks anyways;
- If you can rule out cross-site scripting attacks, your authentication permission stored in some client-side storage is pretty secure - because only you, the owner of your computer and your browser are able to view it;

<b>4.2 Authentication Tokens:</b>
- The server does not store;
- Instead the server creates and signs tokens to the client (in the end, they are random strings);
- Those random strings can be unpacked to data packages (we take various pieces of data and sign them together) - then the token is sent back to the client;
- The client can save that token and attach to the request;
- Even though the server does not store that token in the database or anywhere else, the server knows that you're signed;
- A server will be able to verify if that token was created by it or not - if I come up with a random string and send it to a server to get access, this will not work at all;

## How Next.js handles Authentication
- When we work with **SPA (Single Page Apps), we typically work with Tokens, instead of Sessions**; 
### Reasons for that:
- Pages are server directly and populated with logic, without hitting the server;
- With Next.js, yes! You can build pages which use get server-side props and they will have a request handled by the server, everytime that page is being served... but you will also have many pages which are pre-generated and once the user is on your website, many pages won't be fetched from the backend at all, but instead they will be loaded and generated only with front-end JavaScript;
- You don't send a request to the server, every page that you generated in Next.js or others SPA's;
- Backend API's work in a "stateless" way (they don't care about individual connected clients. They don't keep track of all connected clients). The API can work pretty much on its own. The backend API is able to hand out permissions to the clients that are authenticated;
- Summary: the servers is not involved in every request that's happenning on our pages;
- Because of all of that, we can say that we have a **Detached** frontend and backend combination. They communicate between themselves sometimes, but not everytime that an action is going on on the page;
- Servers don't save information about authenticated clients - instead clients should get information that allows them to prove their authentication;
- For this project, we're using a concept called **JSON Web Tokens** - the most common form of authentication token, and it simplys describes the way the token is generated;

## JSON Web Token
- JSON Web Token is generated by 3 main blocks;
- Combining those 3 pieces, we have a JSON Web Token;
- Signing does not mean **encryption** - the JSON Web Token is not encrypted. You can unpack and read the data inside of it, without knowing that key;
- That key only proves that a given server created that token;
- The key of course will not be included in the token though;
- If you want change the password, for example, you just don't send the old and new password - you'll have to send also the token which will verify the authentic before executing the request;

#### 1. Issuer Data
- Some data that is automatically added by the third-part packages that we use to generate this token. Usually, it's metadata;

#### 2. Custom Data
- User data;

#### 3. Secret Key
- The client never sees that key;
- If you have that key, you can create valid tokens;
- Only the server knows that key;

## Next Auth - Library used to handle Next.js Authentication easily
- [Next-auth v3](https://next-auth.js.org/v3/getting-started/introduction);
```bash
npm install --save-exact next-auth@3
```
- In this project, we're going to use any Providers from NextAuth.js library;
- We have created a auth by scracth using username and password from our database;
- This package has both Server-Side and Client-Side capabilities;
- We'll be able to use on some API routes and components to do the same;
- We will protect our API routes and also manipulate our components to show a different thing if the user is not connected;
- It will not create users for us automatically. We will do that by our own;

## Database + API
- MongoDB + [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2);
```bash
npm install mongodb
```

### Encrypt passwords
- We're using bcrypt library to avoid saving plain password in the database (not a good practice);
```bash
npm install bcryptjs
```

### NextAuth Routes
- To start using our Next Auth library, we need to create a file to catch all routes e concentrate them in the `[...nextauth.js]` file;
- To view the built-in routes, [click here](https://next-auth.js.org/v3/getting-started/rest-api);
- We can always create new aditional custom routes, but we need to check this documentation to not mix with the library built-in ones;

### Cookies
- Next.js adds and manages Cookies for us automatically;
<img src="https://raw.githubusercontent.com/joaolessab/next.js-authentication/main/repo-media/screenshot_1.png">

## Extra: Deploying Next.js Apps

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.