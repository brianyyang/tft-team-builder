import Image from 'next/image';
import { Button } from '@mantine/core';

// Define the props interface
interface ChampionSelectButtonProps {
  champion: Champion;
  height: number;
  width: number;
  onClick: (champion: Champion) => void;
}

const circleButtonStyles = (width: number, height: number) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: width,
  height: height,
  overflow: 'hidden',
});

const ChampionSelectButton: React.FC<ChampionSelectButtonProps> = ({
  champion,
  width,
  height,
  onClick,
}) => {
  return (
    <Button style={circleButtonStyles(width, height)}>
      <Image
        src={champion.iconPath}
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
