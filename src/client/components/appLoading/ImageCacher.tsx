'use client';

import { useEffect, useState } from 'react';
import { Box, Loader, Stack, Title, useMantineTheme } from '@mantine/core';
import { TIERS } from '@/client/utils/TiersUtils';
import { Champion } from '@/types/gameplay/champion';
import styles from './AppLoading.module.css';
import { useChampionDataset } from '@/client/contexts/ChampionDatasetContext';
import ChampionSelector from '../champions/ChampionSelector/ChampionSelector';

interface ImageCacherProps {
  setAreImagesLoading: (areImagesLoading: boolean) => void;
}

const ImageCacher: React.FC<ImageCacherProps> = ({ setAreImagesLoading }) => {
  const { championDataset, traitDataset } = useChampionDataset();

  // cache all champion and trait images
  useEffect(() => {
    const cacheImagePromises: Promise<any>[] = [];
    championDataset.map((champion) => {
      cacheImagePromises.push(cacheImagePromise(champion.iconPath));
      cacheImagePromises.push(cacheImagePromise(champion.splashPath));
    });
    traitDataset.map((trait) => {
      cacheImagePromises.push(cacheImagePromise(trait.iconPath));
    });
    resolveCacheImagePromises(cacheImagePromises);
  }, []);

  const cacheImagePromise = async (imagePath: string) => {
    const promise = new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (err) => reject(err));
      image.src = imagePath;
    });
    return promise;
  };

  const resolveCacheImagePromises = async (promises: Promise<any>[]) => {
    await Promise.all(promises);
    setAreImagesLoading(false);
  };

  return (
    <Box className={styles.loadingBox}>
      <Stack align='center'>
        <Title order={2}>Images Caching</Title>
        <Loader type='dots' color='white' />
      </Stack>
    </Box>
  );
};

export default ImageCacher;
