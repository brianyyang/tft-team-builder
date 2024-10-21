'use client';

import { Box, Title } from '@mantine/core';
import ChampionOptionsGroup from '@/client/components/champions/ChampionOptionsGroup';
import SelectedTeamGroup from '@/client/components/champions/SelectedTeamGroup';
import { SelectedTeamProvider } from '../../contexts/SelectedTeamContext';
import champions from '@/data/champions.json';
import styles from '@/client/css/styles.module.css';
import { TIERS } from '@/client/utils/TiersUtils';
import ActiveTraitGroup from '../traits/ActiveTraitGroup';
import { Champion } from '@/types/gameplay/champion';

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

  return (
    <SelectedTeamProvider>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <Box className={styles.columnContainer}>
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
