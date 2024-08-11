import { useMantineTheme, Button, Box } from '@mantine/core';
import { CustomMantineTheme } from '@/theme/CustomMantineTheme';
import { useSelectedTeam } from './contexts/SelectedTeamContext';
import { useState } from 'react';

interface SelectedChampionButtonProps {
  champion: Champion;
  height: number;
  width: number;
}

const SelectedChampionButton: React.FC<SelectedChampionButtonProps> = ({
  champion,
  width,
  height,
}) => {
  const theme = useMantineTheme() as CustomMantineTheme;
  const { toggleChampion } = useSelectedTeam();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const circleButtonStyles = (
    width: number,
    height: number,
    tier: number,
    imageUrl: string,
    isHovered: boolean
  ) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: '0px',
    outline: isHovered ? `4px solid ${theme.tierToColorMap[tier]}` : '',
    borderColor: theme.tierToColorMap[tier],
    width: width,
    height: height,
    overflow: 'hidden',
    backgroundImage: `${
      isHovered
        ? 'radial-gradient(circle, rgba(0,0,0,0) 25%, rgba(100,255,255,0.5) 75%, rgba(150,150,150,0.8) 100%),'
        : ''
    } url(${imageUrl})`,
    backgroundSize: '100%',
    cursor: 'pointer',
    borderRadius: '5px',
  });

  return (
    <Box>
      <Button
        style={circleButtonStyles(
          width,
          height,
          champion.tier,
          champion.splashPath,
          isHovered
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => toggleChampion(champion)}
      />
      <Box>{champion.name}</Box>
    </Box>
  );
};

export default SelectedChampionButton;
