'use client';

import { Box, Title } from '@mantine/core';
import ChampionOptionsGroup from '@/components/champions/ChampionOptionsGroup';
import SelectedTeamGroup from '@/components/champions/SelectedTeamGroup';
import { SelectedTeamProvider } from '../contexts/SelectedTeamContext';
import champions from '@/data/champions.json';
import traits from '@/data/traits.json';
import styles from '@/css/styles.module.css';
import { TIERS } from '@/utils/TiersUtils';
import ActiveTraitGroup from '../traits/ActiveTraitGroup';
import { Champion } from '@/types/gameplay/champion';
import { useEffect } from 'react';

// preload all images
const preloadImages = () => {
  champions.forEach((champion) => {
    const img = new Image();
    img.src = champion.iconPath;
    img.src = champion.splashPath;
  });

  traits.forEach((trait) => {
    const img = new Image();
    img.src = `/assets/traits/${trait.id}.png`;
  });
};

const typedChampions: Champion[] = champions;

const sortByTiers = (champions: Champion[]): Map<number, Champion[]> => {
  let tierMap = new Map<number, Champion[]>();
  TIERS.forEach((tier) => {
    tierMap.set(tier, []);
  });
  champions.forEach((champion) => {
    tierMap.get(champion.tier)?.push(champion);
  });

  return tierMap;
};

const ChampionSelector: React.FC = () => {
  const tierMap = sortByTiers(typedChampions);

  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <SelectedTeamProvider>
      <Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box className={styles.columnContainer}>
          <Title className={styles.whiteText} style={{ marginLeft: '25px' }}>
            Team Planner
          </Title>
          <Box className={styles.championOptionsContainer}>
            {TIERS.map((tier) => (
              <ChampionOptionsGroup
                key={'tier_' + tier + '_champions'}
                champions={tierMap.get(tier) as Champion[]}
                imageWidth={76}
                imageHeight={76}
              />
            ))}
          </Box>
        </Box>
        <Box
          className={`${styles.columnContainer} ${styles.selectedChampionsContainer}`}
        >
          <Title className={styles.whiteText}>Selected Champions</Title>
          <SelectedTeamGroup
            key={'selected_champions'}
            imageWidth={192}
            imageHeight={192}
          />
          <ActiveTraitGroup />
        </Box>
      </Box>
    </SelectedTeamProvider>
  );
};

export default ChampionSelector;
