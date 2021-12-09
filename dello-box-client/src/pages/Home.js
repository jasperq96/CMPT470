import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';

export default function Home() {
  const userContext = useContext(UserContext);

  return (
    <div>
      <h1>Welcome back {userContext.user?.username}</h1>
    </div>
  );
}
