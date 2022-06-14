import { getSession } from 'next-auth/client'; // We can use this even though is being imported in the client-side
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return <UserProfile />;
}

// Every Income Request matters, that's why we're using getServerSideProps
export async function getServerSideProps(context){
  const session = await getSession({req: context.req}); // Behind the scenes, this function will check the cookie + session of the context request
  
  if(!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false // only this time, because the user is logged off
      }
    };
  }

  return {
    props: { session },
  }
}

export default ProfilePage;
