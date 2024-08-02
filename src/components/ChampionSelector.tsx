import { Box } from '@mantine/core';
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
  const tierMap = sortByTiers();
  return (
    <Box className={styles.container}>
      {TIERS.map((tier) => (
        <ChampionGroup
          key={'tier_' + tier + '_champions'}
          champions={tierMap.get(tier) as Champion[]}
          imageWidth={64}
          imageHeight={64}
        />
      ))}
    </Box>
  );
};

export default ChampionSelector;
