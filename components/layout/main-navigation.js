import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import classes from './main-navigation.module.css';

function MainNavigation() {
  const { data: session, status } = useSession();

  
  function logoutHandler(){
    signOut(); // Just that and next-auth JS will clean everything for us + Session token cookie will be erased from the Network tab
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          { !session && status !== "loading" && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}

          { session && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}

          { session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
