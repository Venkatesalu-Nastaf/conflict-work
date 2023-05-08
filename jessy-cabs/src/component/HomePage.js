import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div>
      <h1>Home Page</h1>
      {isLoggedIn ? (
        <div>
          <p>You are logged in.</p>
          <Link to="/logout">Log out</Link>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <Link to="/login">Log in</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
