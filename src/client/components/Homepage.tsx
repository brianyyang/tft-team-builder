'use client';

import { useEffect } from 'react';
import { Box } from '@mantine/core';
import { useUser } from '@/client/contexts/UserContext';
import ChampionSelector from '@/client/components/champions/ChampionSelector';
import Login from '@/client/components/Login';
import Header from './Header';

export const Homepage = () => {
  const { username, setUsername } = useUser();

  useEffect(() => {
    const name = window.localStorage.getItem('username');
    if (name) {
      setUsername(name);
    }
  }, []);

  const onSubmitUsername = (username: string) => {
    window.localStorage.setItem('username', username);
    setUsername(username);
  };

  const onLogout = () => {
    window.localStorage.removeItem('username');
    setUsername('');
  };

  return (
    <Box>
      {username ? (
        <>
          <Header username={username} onLogout={onLogout} />
          <ChampionSelector />
        </>
      ) : (
        <Login onSubmitUsername={onSubmitUsername} />
      )}
    </Box>
  );
};