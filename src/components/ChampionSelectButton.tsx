import Image from 'next/image';
import { Button } from '@mantine/core';
import { TierToColorMap } from '@/utils/TiersUtils';

// Define the props interface
interface ChampionSelectButtonProps {
  champion: Champion;
  isFullImage: boolean;
  height: number;
  width: number;
  onClick: (champion: Champion) => void;
}

const circleButtonStyles = (
  width: number,
  height: number,
  tier: number,
  isFullImage: boolean
) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderStyle: 'solid',
  borderWidth: isFullImage ? '0px' : '2px',
  borderColor: TierToColorMap[tier],
  width: width,
  height: height,
  overflow: 'hidden',
});

const ChampionSelectButton: React.FC<ChampionSelectButtonProps> = ({
  champion,
  isFullImage,
  width,
  height,
  onClick,
}) => {
  return (
    <Button
      style={circleButtonStyles(width, height, champion.tier, isFullImage)}
    >
      <Image
        src={isFullImage ? champion.splashPath : champion.iconPath}
        style={{ display: 'block' }}
        alt={champion.name}
        id={champion.id}
        width={width}
        height={height}
        onClick={() => onClick(champion)}
      />
    </Button>
  );
};

export default ChampionSelectButton;
