import { Button } from '@mantine/core';
import { useSelectedTeam } from './contexts/SelectedTeamContext';
import { TierToColorMap } from '@/utils/TiersUtils';
import { useState } from 'react';

interface ChampionOptionButtonProps {
  champion: Champion;
  height: number;
  width: number;
}

const circleButtonStyles = (
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
  borderStyle: 'solid',
  borderColor: isHighlighted ? 'white' : TierToColorMap[tier],
  outline: isHighlighted ? '1px solid white' : '',
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
});

const ChampionOptionButton: React.FC<ChampionOptionButtonProps> = ({
  champion,
  width,
  height,
}) => {
  const { selectedChampions, toggleChampion } = useSelectedTeam();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <Button
      style={circleButtonStyles(
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
