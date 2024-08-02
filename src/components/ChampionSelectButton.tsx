import Image from 'next/image';
import { Button } from '@mantine/core';

// Define the props interface
interface ChampionSelectButtonProps {
  imagePath: string;
  championName: string;
  height: number;
  width: number;
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
  imagePath,
  championName,
  width,
  height,
}) => {
  return (
    <Button style={circleButtonStyles(width, height)}>
      <Image
        src={imagePath}
        alt={championName}
        id={championName}
        width={width}
        height={height}
      />
    </Button>
  );
};

export default ChampionSelectButton;
