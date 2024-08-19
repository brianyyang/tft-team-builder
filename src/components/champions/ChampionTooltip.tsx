import { Box, MantineStyleProp } from '@mantine/core';
import { Champion } from '@/types/gameplay/champion';

interface ChampionTooltipProps {
  champion: Champion;
  top: number;
  left: number;
  width: number;
  height: number;
}

const tooltipStyles = (
  top: number,
  left: number,
  imageUrl: string,
  width: number,
  height: number
) =>
  ({
    position: 'absolute',
    top: top,
    left: left,
    backgroundImage: `url(${imageUrl})`,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backgroundBlendMode: 'lighten',
    backgroundSize: '100%',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    height: height,
    width: width,
  } as MantineStyleProp);

const ChampionTooltip: React.FC<ChampionTooltipProps> = ({
  champion,
  top,
  left,
  width,
  height,
}) => {
  return (
    <Box style={tooltipStyles(top, left, champion.splashPath, width, height)}>
      {champion.name}
      <br />
      {champion.traits.map((trait) => trait.name)}
    </Box>
  );
};

export default ChampionTooltip;
