import { MantineProvider, Box } from '@mantine/core';
import ChampionSelector from '@/components/champions/ChampionSelector';
import theme from '@/theme/theme';

export default function Home() {
  return (
    <MantineProvider theme={theme}>
      <Box>
        <ChampionSelector />
      </Box>
    </MantineProvider>
  );
}

/*
  <a
    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    className={styles.card}
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2>
      Deploy <span>-&gt;</span>
    </h2>
    <p>
      Instantly deploy your Next.js site to a shareable URL with Vercel.
    </p>
  </a>
*/
