'use client';

import { useEffect } from 'react';
import { Box } from '@mantine/core';
import { useUser } from '@/client/contexts/UserContext';
import ChampionSelector from '@/client/components/champions/ChampionSelector';
import Login from '@/client/components/Login';

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

  return (
    <Box>
      {username ? (
        <>
          {username}
          <ChampionSelector />
        </>
      ) : (
        <Login onSubmitUsername={onSubmitUsername} />
      )}
    </Box>
  );
};
