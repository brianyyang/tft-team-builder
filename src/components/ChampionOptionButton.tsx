import Image from 'next/image';
import { Button } from '@mantine/core';
import { useSelectedTeam } from './contexts/SelectedTeamContext';
import { TierToColorMap } from '@/utils/TiersUtils';

interface ChampionOptionButtonProps {
  champion: Champion;
  height: number;
  width: number;
}

const circleButtonStyles = (width: number, height: number, tier: number) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderStyle: 'solid',
  borderColor: TierToColorMap[tier],
  width: width,
  height: height,
  overflow: 'hidden',
});

const ChampionOptionButton: React.FC<ChampionOptionButtonProps> = ({
  champion,
  width,
  height,
}) => {
  const { toggleChampion } = useSelectedTeam();
  return (
    <Button style={circleButtonStyles(width, height, champion.tier)}>
      <Image
        src={champion.iconPath}
        alt={champion.name}
        id={champion.id}
        width={width}
        height={height}
        onClick={() => toggleChampion(champion)}
      />
    </Button>
  );
};

export default ChampionOptionButton;
