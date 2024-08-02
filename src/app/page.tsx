import styles from './page.module.css';
import { MantineProvider } from '@mantine/core';
import ChampionSelector from '@/components/ChampionSelector';

export default function Home() {
  return (
    <MantineProvider>
      <main className={styles.main}>
        <div className={styles.description}>
          <ChampionSelector />
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
        </div>
      </main>{' '}
    </MantineProvider>
  );
}
