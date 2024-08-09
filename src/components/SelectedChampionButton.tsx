import { Button } from '@mantine/core';
import { useSelectedTeam } from './contexts/SelectedTeamContext';
import { TierToColorMap } from '@/utils/TiersUtils';

interface SelectedChampionButtonProps {
  champion: Champion;
  height: number;
  width: number;
}

const circleButtonStyles = (
  width: number,
  height: number,
  tier: number,
  imageUrl: string
) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderStyle: 'solid',
  borderWidth: '0px',
  borderColor: TierToColorMap[tier],
  width: width,
  height: height,
  overflow: 'hidden',
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: '100%',
});

const SelectedChampionButton: React.FC<SelectedChampionButtonProps> = ({
  champion,
  width,
  height,
}) => {
  const { toggleChampion } = useSelectedTeam();
  return (
    <Button
      style={circleButtonStyles(
        width,
        height,
        champion.tier,
        champion.splashPath
      )}
      onClick={() => toggleChampion(champion)}
    />
  );
};

export default SelectedChampionButton;
