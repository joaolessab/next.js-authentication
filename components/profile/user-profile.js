import { getSession } from 'next-auth/client';
import { useState, useEffect } from 'react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // Redirect away if NOT auth
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then(session => {
      setIsLoading(false);
      if (!session){
        window.location.href = '/auth';
      }
    })
  }, []);

  if(isLoading){
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
