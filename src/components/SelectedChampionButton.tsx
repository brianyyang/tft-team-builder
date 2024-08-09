import Image from 'next/image';
import { Button } from '@mantine/core';
import { useSelectedTeam } from './contexts/SelectedTeamContext';
import { TierToColorMap } from '@/utils/TiersUtils';

interface SelectedChampionButtonProps {
  champion: Champion;
  height: number;
  width: number;
}

const circleButtonStyles = (width: number, height: number, tier: number) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderStyle: 'solid',
  borderWidth: '0px',
  borderColor: TierToColorMap[tier],
  width: width,
  height: height,
  overflow: 'hidden',
});

const SelectedChampionButton: React.FC<SelectedChampionButtonProps> = ({
  champion,
  width,
  height,
}) => {
  const { toggleChampion } = useSelectedTeam();
  return (
    <Button style={circleButtonStyles(width, height, champion.tier)}>
      <Image
        src={champion.splashPath}
        style={{ display: 'block' }}
        alt={champion.name}
        id={champion.id}
        width={width}
        height={height}
        onClick={() => toggleChampion(champion)}
      />
    </Button>
  );
};

export default SelectedChampionButton;
