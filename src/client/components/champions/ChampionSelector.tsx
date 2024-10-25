'use client';

import { Box, TextInput, Title, useMantineTheme } from '@mantine/core';
import ChampionOptionsGroup from '@/client/components/champions/ChampionOptionsGroup';
import SelectedTeamGroup from '@/client/components/champions/SelectedTeamGroup';
import { SelectedTeamProvider } from '../../contexts/SelectedTeamContext';
import champions from '@/data/champions.json';
import styles from '@/client/css/styles.module.css';
import { TIERS } from '@/client/utils/TiersUtils';
import ActiveTraitGroup from '../traits/ActiveTraitGroup';
import { Champion } from '@/types/gameplay/champion';
import { CiEdit } from 'react-icons/ci';
import { useState } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';

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
  const theme = useMantineTheme();
  const [isEditTeamNameHovered, setIsEditTeamNameHovered] =
    useState<boolean>(false);
  const [isEditingTeamName, setIsEditingTeamName] = useState<boolean>(false);
  const [isSaveTeamNameHovered, setIsSaveTeamNameHovered] =
    useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>('Selected Champions');

  const buttonStyles = (isButtonHovered: boolean) => ({
    cursor: 'pointer',
    width: 'auto',
    height: '100%',
    color: 'white',
    borderRadius: '10px',
    backgroundColor: isButtonHovered
      ? `${theme.other.tierToColorMap[1].light}80`
      : 'transparent',
    marginLeft: '5px',
  });

  const teamNameTextInputStyles = {
    fontSize: '2em',
    fontWeight: 'bold',
    height: 'auto',
    backgroundColor: `${theme.other.tierToColorMap[1].light}10`,
    color: 'white',
    paddingLeft: '5px',
    borderStyle: 'solid',
    borderRadius: '10px',
  };

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
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            {isEditingTeamName ? (
              <>
                <TextInput
                  value={teamName}
                  onChange={(e) => {
                    const newTeamName = e.target.value;
                    if (newTeamName.length > 24) {
                      setTeamName(e.target.value.substring(0, 24));
                    } else {
                      setTeamName(e.target.value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsSaveTeamNameHovered(false);
                      setIsEditingTeamName(false);
                    }
                  }}
                  styles={{
                    input: teamNameTextInputStyles,
                  }}
                />
                <IoCheckmarkOutline
                  style={buttonStyles(isSaveTeamNameHovered)}
                  onClick={() => {
                    setIsEditingTeamName(false);
                    setIsSaveTeamNameHovered(false);
                  }}
                  onMouseEnter={() => setIsSaveTeamNameHovered(true)}
                  onMouseLeave={() => setIsSaveTeamNameHovered(false)}
                />
              </>
            ) : (
              <>
                <Title>{teamName}</Title>
                <CiEdit
                  style={buttonStyles(isEditTeamNameHovered)}
                  onClick={() => {
                    setIsEditingTeamName(true);
                    setIsEditTeamNameHovered(false);
                  }}
                  onMouseEnter={() => setIsEditTeamNameHovered(true)}
                  onMouseLeave={() => setIsEditTeamNameHovered(false)}
                />
              </>
            )}
          </Box>
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
