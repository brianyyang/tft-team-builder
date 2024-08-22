import { Trait } from '@/client/types/gameplay/trait';
import { Box, MantineStyleProp, useMantineTheme } from '@mantine/core';

interface TraitHexProps {
  trait: Trait;
  width: number;
  height: number;
  backgroundColor: string;
  invertIconColor: boolean;
}

const border = (width: number, height: number) =>
  ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
    background: 'white',
    margin: '2px 3px 2px 5px',
  } as MantineStyleProp);

const hexagon = (width: number, height: number, backgroundColor: string) =>
  ({
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 1.15,
    height: height / 1.15,
    clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
    background: backgroundColor,
  } as MantineStyleProp);

const imageStyles = (
  width: number,
  height: number,
  imageUrl: string,
  invertIconColor: boolean
) => ({
  width: width / 1.5,
  height: height / 1.5,
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: '100%',
  filter: invertIconColor ? 'brightness(0) saturate(100%)' : '',
});

const TraitHex: React.FC<TraitHexProps> = ({
  trait,
  width,
  height,
  backgroundColor,
  invertIconColor,
}) => {
  const theme = useMantineTheme();
  return (
    <Box style={border(width, height)}>
      <Box style={hexagon(width, height, backgroundColor)}>
        <Box
          style={imageStyles(
            width,
            height,
            `/assets/traits/${trait.id}.png`,
            invertIconColor
          )}
        />
      </Box>
    </Box>
  );
};

export default TraitHex;
