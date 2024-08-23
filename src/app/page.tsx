'use client';

import { MantineProvider } from '@mantine/core';
import { UserProvider } from '@/client/contexts/UserContext';
import theme from '@/client/theme/theme';
import { Homepage } from '@/client/components/Homepage';

export default function Home() {
  return (
    <MantineProvider theme={theme}>
      <UserProvider>
        <Homepage />
      </UserProvider>
    </MantineProvider>
  );
}
