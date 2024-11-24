'use client';

import { useEffect } from 'react';
import { Box } from '@mantine/core';
import { useUser } from '@/client/contexts/UserContext';
import ChampionSelector from '@/client/components/champions/ChampionSelector/ChampionSelector';
import Login from '@/client/components/Login';
import Header from './Header';
import { SelectedTeamProvider } from '../contexts/SelectedTeamContext';
import { CURRENT_SET_NUMBER } from '../utils/EnvironmentVariables';
import { ChampionDatasetProvider } from '../contexts/ChampionDatasetContext';

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
    <Box style={{ height: '100%' }}>
      {username ? (
        <>
          <Header username={username} onLogout={onLogout} />
          <ChampionDatasetProvider defaultSetNumber={CURRENT_SET_NUMBER}>
            <SelectedTeamProvider>
              <ChampionSelector />
            </SelectedTeamProvider>
          </ChampionDatasetProvider>
        </>
      ) : (
        <Login onSubmitUsername={onSubmitUsername} />
      )}
    </Box>
  );
};
