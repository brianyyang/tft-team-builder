import Image from 'next/image';
import { Button } from '@mantine/core';

// Define the props interface
interface ChampionSelectButtonProps {
  imagePath: string;
  championName: string;
  height: number;
  width: number;
}

const circleButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: 128,
  height: 128,
  padding: 0,
  overflow: 'hidden',
};

const ChampionSelectButton: React.FC<ChampionSelectButtonProps> = ({
  imagePath,
  championName,
  ...rest
}) => {
  return (
    <Button style={circleButtonStyles}>
      <Image src={imagePath} alt={championName} id={championName} {...rest} />
    </Button>
  );
};

export default ChampionSelectButton;
