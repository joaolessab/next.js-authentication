import { useSession } from 'next-auth/client';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile(){
  // Redirect away if NOT auth
  const [session, loading] = useSession();

  if(loading){
    return <p className={classes.profile}>Loading...</p>;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
