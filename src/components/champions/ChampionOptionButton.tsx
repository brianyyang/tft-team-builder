import { useMantineTheme, Button } from '@mantine/core';
import { useSelectedTeam } from '../contexts/SelectedTeamContext';
import { useState } from 'react';

interface ChampionOptionButtonProps {
  champion: Champion;
  height: number;
  width: number;
}

const ChampionOptionButton: React.FC<ChampionOptionButtonProps> = ({
  champion,
  width,
  height,
}) => {
  const theme = useMantineTheme();
  const { selectedChampions, toggleChampion } = useSelectedTeam();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const buttonStyles = (
    width: number,
    height: number,
    tier: number,
    imageUrl: string,
    isHighlighted: boolean,
    isHovered: boolean
  ) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderSize: '2px',
    borderStyle: 'solid',
    borderColor: isHighlighted
      ? 'rgb(209 207 189)'
      : theme.other.tierToColorMap[tier],
    borderWidth: '3px',
    outline: isHighlighted ? '1px solid rgb(209 207 189)' : '',
    width: width,
    height: height,
    overflow: 'hidden',
    backgroundImage: `${
      isHighlighted || isHovered
        ? 'radial-gradient(circle, rgba(0,0,0,0) 25%, rgba(100,255,255,0.5) 75%, rgba(150,150,150,0.8) 100%),'
        : ''
    } url(${imageUrl})`,
    backgroundSize: '100%',
    cursor: 'pointer',
    boxShadow: isHighlighted ? '0px 0px 10px 2px rgba(255, 255, 190, .75)' : '',
    borderRadius: '5px',
  });

  return (
    <Button
      style={buttonStyles(
        width,
        height,
        champion.tier,
        champion.iconPath,
        selectedChampions.includes(champion),
        isHovered
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => toggleChampion(champion)}
    />
  );
};

export default ChampionOptionButton;
