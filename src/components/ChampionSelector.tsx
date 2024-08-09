'use client';

import { Box, Title } from '@mantine/core';
import ChampionOptionsGroup from '@/components/ChampionOptionsGroup';
import SelectedTeamGroup from '@/components/SelectedTeamGroup';
import { SelectedTeamProvider } from './contexts/SelectedTeamContext';
import champions from '@/data/champions.json';
import styles from '@/css/styles.module.css';
import { TIERS } from '@/utils/TiersUtils';

const typedChampions: Champion[] = champions;

const sortByTiers = (): Map<number, Champion[]> => {
  let tierMap = new Map<number, Champion[]>();
  TIERS.forEach((tier) => {
    tierMap.set(tier, []);
  });
  typedChampions.forEach((champion) => {
    tierMap.get(champion.tier)?.push(champion);
  });

  return tierMap;
};

const ChampionSelector: React.FC = () => {
  const tierMap = sortByTiers();

  return (
    <SelectedTeamProvider>
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        <Box className={styles.columnContainer}>
          <Title>Team Planner</Title>
          {TIERS.map((tier) => (
            <ChampionOptionsGroup
              key={'tier_' + tier + '_champions'}
              champions={tierMap.get(tier) as Champion[]}
              imageWidth={64}
              imageHeight={64}
            />
          ))}
        </Box>
        <Box className={styles.columnContainer}>
          <Title>Selected Champions</Title>
          <SelectedTeamGroup
            key={'selected_champions'}
            imageWidth={128}
            imageHeight={128}
          />
        </Box>
      </Box>
    </SelectedTeamProvider>
  );
};

export default ChampionSelector;
