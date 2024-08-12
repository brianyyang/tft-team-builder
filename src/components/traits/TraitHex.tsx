// @ts-ignore
import Hexagon from 'react-hexagon';
import { Box } from '@mantine/core';

interface TraitHexProps {
  trait: Trait;
  width: number;
  height: number;
}

const hexagonStyles = (width: number, height: number) => ({
  width: width,
  height: height,
  margin: '8px',
});

const TraitHex: React.FC<TraitHexProps> = ({ trait, width, height }) => {
  return (
    <Box style={hexagonStyles(width, height)}>
      <Hexagon
        style={{
          stroke: 'white',
          strokeWidth: '25',
        }}
        backgroundImage={`/assets/traits/${trait.id}.png`}
      />
    </Box>
  );
};

export default TraitHex;
