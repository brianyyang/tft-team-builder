'use client';

import {
  Box,
  Button,
  Group,
  MantineStyleProp,
  Modal,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import ChampionOptionsGroup from '@/client/components/champions/ChampionSelector/ChampionOptionsGroup';
import SelectedTeamGroup from '@/client/components/champions/ChampionSelector/SelectedTeamGroup';
import { useSelectedTeam } from '../../../contexts/SelectedTeamContext';
import champions from '@/data/champions.json';
import styles from './ChampionSelector.module.css';
import { TIERS } from '@/client/utils/TiersUtils';
import ActiveTraitGroup from '../../traits/ActiveTraitGroup';
import { Champion } from '@/types/gameplay/champion';
import { CiEdit, CiFloppyDisk } from 'react-icons/ci';
import { useState } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { createTeam } from '@/client/apis/teamAPI';
import { Team } from '@/types/team';
import { useUser } from '@/client/contexts/UserContext';

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
  const theme = useMantineTheme();
  const tierMap = sortByTiers(typedChampions);
  const { selectedChampions } = useSelectedTeam();
  const { username } = useUser();
  const [teamId, setTeamId] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('Selected Champions');
  const [isEditingTeamName, setIsEditingTeamName] = useState<boolean>(false);
  const [isEditTeamNameHovered, setIsEditTeamNameHovered] =
    useState<boolean>(false);
  const [isSaveTeamHovered, setIsSaveTeamHovered] = useState<boolean>(false);
  const [isSaveTeamNameHovered, setIsSaveTeamNameHovered] =
    useState<boolean>(false);
  const [showSaveConfirmation, setShowSaveConfirmation] =
    useState<boolean>(false);

  const flexRowStyles = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  } as MantineStyleProp;

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

  const teamNameTitleStyles = {
    textDecoration: `${isEditTeamNameHovered ? 'underline' : 'none'}${
      theme.other.tierToColorMap[1].light
    }80`,
  };

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

  const handlePostTeam = async () => {
    try {
      const response = await createTeam(
        new Team(teamName, selectedChampions),
        username
      );
      setTeamId(response.team._id);
      console.log(response.message);
    } catch (err) {
      console.error('Error fetching team:', err);
    }
  };

  return (
    <Box style={flexRowStyles}>
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
        <Box style={flexRowStyles}>
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
              <Title style={teamNameTitleStyles}>{teamName}</Title>
              <CiEdit
                style={buttonStyles(isEditTeamNameHovered)}
                onClick={() => {
                  setIsEditingTeamName(true);
                  setIsEditTeamNameHovered(false);
                }}
                onMouseEnter={() => setIsEditTeamNameHovered(true)}
                onMouseLeave={() => setIsEditTeamNameHovered(false)}
              />
              <CiFloppyDisk
                style={buttonStyles(isSaveTeamHovered)}
                onClick={() => {
                  setShowSaveConfirmation(!showSaveConfirmation);
                  setIsSaveTeamHovered(false);
                }}
                onMouseEnter={() => setIsSaveTeamHovered(true)}
                onMouseLeave={() => setIsSaveTeamHovered(false)}
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
      <Modal
        opened={showSaveConfirmation}
        onClose={() => setShowSaveConfirmation(false)}
        title='Do you want to save the following team?'
        size={'md'}
        classNames={{
          header: styles.modalHeader,
          title: styles.modalTitle,
          content: styles.modalContent,
        }}
        centered
        withCloseButton={false}
      >
        <Group justify='center' mt='md'>
          <Button
            onClick={() => setShowSaveConfirmation(false)}
            variant='outline'
            color='white'
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handlePostTeam();
              setShowSaveConfirmation(false);
            }}
            color='red'
          >
            Confirm
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};

export default ChampionSelector;