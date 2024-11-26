'use client';

import { useEffect, useState } from 'react';
import { Box, Loader, Stack, Title } from '@mantine/core';
import { TIERS } from '@/client/utils/TiersUtils';
import { Champion } from '@/types/gameplay/champion';
import styles from './AppLoading.module.css';
import { useChampionDataset } from '@/client/contexts/ChampionDatasetContext';
import ChampionSelector from '../champions/ChampionSelector/ChampionSelector';
import ImageCacher from './ImageCacher';
import { ActiveTrait } from '@/types/gameplay/trait';
import { useSelectedTeam } from '@/client/contexts/SelectedTeamContext';
import { createTraitsMap } from '@/client/utils/ActiveTraitUtils';

const SetLoader: React.FC = () => {
  const { setNumber, setChampionDataset, setTierMap, setTraitDataset } =
    useChampionDataset();
  const { setActiveTraits } = useSelectedTeam();
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [areImagesLoading, setAreImagesLoading] = useState<boolean>(true);

  const sortByTiers = (champions: Champion[]): Map<number, Champion[]> => {
    let newTierMap = new Map<number, Champion[]>();
    TIERS.forEach((tier) => {
      newTierMap.set(tier, []);
    });
    champions.forEach((champion) => {
      newTierMap.get(champion.tier)?.push(champion);
    });

    return newTierMap;
  };

  // load champion and trait data when set number changes
  useEffect(() => {
    setIsDataLoading(true);
    const loadSetData = async () => {
      try {
        const championsData = await import(
          `@/data/set${setNumber}/champions.json`
        );
        // exclude default and length from ES module
        const { default: _, length, ...filteredChampionsData } = championsData;
        setChampionDataset(Object.values(filteredChampionsData));
        setTierMap(sortByTiers(Object.values(filteredChampionsData)));
      } catch (error) {
        console.error('Error loading champions:', error);
      }
      try {
        const traitsData = await import(`@/data/set${setNumber}/traits.json`);
        // exclude default and length from ES module
        const { default: _, length, ...filteredTraitsData } = traitsData;
        setTraitDataset(Object.values(filteredTraitsData));
        setActiveTraits(createTraitsMap(Object.values(filteredTraitsData)));
      } catch (error) {
        console.error('Error loading champions:', error);
      }
      setIsDataLoading(false);
    };

    loadSetData();
  }, [setNumber]);

  return (
    <>
      {isDataLoading ? (
        <Box className={styles.loadingBox}>
          <Stack align='center'>
            <Title order={2}>Data Loading</Title>
            <Loader type='dots' color='white' />
          </Stack>
        </Box>
      ) : areImagesLoading ? (
        <ImageCacher setAreImagesLoading={setAreImagesLoading} />
      ) : (
        <ChampionSelector />
      )}
    </>
  );
};

export default SetLoader;
