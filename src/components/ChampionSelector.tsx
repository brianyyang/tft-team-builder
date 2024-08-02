'use client';

import { useState } from 'react';
import { Box, Title } from '@mantine/core';
import ChampionGroup from '@/components/ChampionGroup';
import champions from '@/data/champions.json';
import styles from '@/css/styles.module.css';

const TIERS = [1, 2, 3, 4, 5];
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
  const [team, setTeam] = useState<Champion[]>([]);
  const tierMap = sortByTiers();

  const toggleChampion = (champion: Champion) => {
    if (team.some((teamChamp) => teamChamp.id === champion.id)) {
      setTeam(team.filter((teamChamp) => teamChamp.id !== champion.id));
    } else {
      setTeam([...team, champion]);
    }
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'row' }}>
      <Box className={styles.columnContainer}>
        <Title>Champion Selector</Title>
        {TIERS.map((tier) => (
          <ChampionGroup
            key={'tier_' + tier + '_champions'}
            champions={tierMap.get(tier) as Champion[]}
            imageWidth={64}
            imageHeight={64}
            onClick={toggleChampion}
          />
        ))}
      </Box>
      <Box className={styles.columnContainer}>
        <Title>Selected Champions</Title>
        {team.map((champion) => (
          <Box className={styles.rowContainer}>{champion.name}</Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChampionSelector;
