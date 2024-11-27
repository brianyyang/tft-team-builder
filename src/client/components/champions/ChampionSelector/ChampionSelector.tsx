'use client';

import { useState } from 'react';
import { CiEdit, CiFloppyDisk, CiShuffle, CiTrash } from 'react-icons/ci';
import { IoCheckmarkOutline } from 'react-icons/io5';
import {
  Box,
  Button,
  FocusTrap,
  Group,
  MantineStyleProp,
  Modal,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import ChampionOptionsGroup from './ChampionOptionsGroup';
import SelectedTeamGroup from './SelectedTeamGroup';
import { useSelectedTeam } from '@/client/contexts/SelectedTeamContext';
import { useUser } from '@/client/contexts/UserContext';
import styles from './ChampionSelector.module.css';
import { TIERS } from '@/client/utils/TiersUtils';
import ActiveTraitGroup from '@/client/components/traits/ActiveTraitGroup';
import { Champion } from '@/types/gameplay/champion';
import { createTeam, updateTeam } from '@/client/apis/teamAPI';
import { Team } from '@/types/team';
import { randomChampions } from '@/client/utils/ChampionUtils';
import { useChampionDataset } from '@/client/contexts/ChampionDatasetContext';
import { useDisclosure } from '@mantine/hooks';

const ChampionSelector: React.FC = () => {
  const { championDataset, tierMap, setNumber } = useChampionDataset();
  const { selectedChampions, setSelectedTeam } = useSelectedTeam();
  const { username } = useUser();
  const [teamId, setTeamId] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('Selected Champions');

  // states for modals and other workflows
  const [isEditingTeamName, toggleEditingTeamName] = useDisclosure(false);
  const [showSaveConfirmation, setShowSaveConfirmation] =
    useState<boolean>(false);

  // hover states for team button actions
  const [isEditTeamNameHovered, setIsEditTeamNameHovered] =
    useState<boolean>(false);
  const [isSaveTeamHovered, setIsSaveTeamHovered] = useState<boolean>(false);
  const [isSaveTeamNameHovered, setIsSaveTeamNameHovered] =
    useState<boolean>(false);
  const [isRandomHovered, setIsRandomHovered] = useState<boolean>(false);
  const [isTrashHovered, setIsTrashHovered] = useState<boolean>(false);

  const theme = useMantineTheme();

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
    userSelect: 'none',
  } as MantineStyleProp;

  const teamNameTextInputStyles = {
    fontSize: 'var(--mantine-h1-font-size)',
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
        new Team(teamName, selectedChampions, setNumber),
        username
      );
      setTeamId(response.team._id);
      console.log(response.message);
    } catch (err) {
      console.error('Error fetching team:', err);
    }
  };

  const handlePatchTeam = async () => {
    try {
      const response = await updateTeam(
        new Team(teamName, selectedChampions, setNumber, teamId),
        username
      );
      console.log(response.message);
    } catch (err) {
      console.error('Error fetching team:', err);
    }
  };

  return (
    <>
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
                <FocusTrap active={isEditingTeamName}>
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
                        toggleEditingTeamName.close();
                      }
                    }}
                    styles={{
                      input: teamNameTextInputStyles,
                    }}
                  />
                </FocusTrap>
                <IoCheckmarkOutline
                  style={buttonStyles(isSaveTeamNameHovered)}
                  onClick={() => {
                    toggleEditingTeamName.close();
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
                    toggleEditingTeamName.open();
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
                <CiShuffle
                  style={buttonStyles(isRandomHovered)}
                  onClick={() => {
                    setSelectedTeam(randomChampions(championDataset, 8));
                  }}
                  onMouseEnter={() => setIsRandomHovered(true)}
                  onMouseLeave={() => setIsRandomHovered(false)}
                />
                <CiTrash
                  style={buttonStyles(isTrashHovered)}
                  onClick={() => setSelectedTeam([])}
                  onMouseEnter={() => setIsTrashHovered(true)}
                  onMouseLeave={() => setIsTrashHovered(false)}
                />
              </>
            )}
          </Box>
          <SelectedTeamGroup
            key={'selected_champions'}
            imageWidth={170}
            imageHeight={170}
          />
          <ActiveTraitGroup />
        </Box>
        <Modal
          opened={showSaveConfirmation}
          onClose={() => setShowSaveConfirmation(false)}
          title={teamId == '' ? 'Confirm Save Team' : 'Confirm Update Team'}
          size={'md'}
          classNames={{
            header: styles.saveTeamModalHeader,
            title: styles.saveTeamModalTitle,
            content: styles.saveTeamModalContent,
          }}
          centered
          withCloseButton={false}
          radius={10}
        >
          <FocusTrap.InitialFocus />
          Do you want to save your current team?
          <Group
            justify='flex-end'
            className={styles.saveTeamModalButtonsContainer}
            gap='xs'
          >
            <Button
              onClick={() => setShowSaveConfirmation(false)}
              color={`${theme.other.tierToColorMap[1].light}70`}
              className={styles.saveTeamModalCancelButton}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                teamId == '' ? handlePostTeam() : handlePatchTeam();
                setShowSaveConfirmation(false);
              }}
              color={'violet'}
              className={styles.saveTeamModalConfirmButton}
            >
              Confirm
            </Button>
          </Group>
        </Modal>
      </Box>
    </>
  );
};

export default ChampionSelector;
