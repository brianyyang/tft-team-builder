import { Box, MantineStyleProp, useMantineTheme } from '@mantine/core';
import { Champion } from '@/types/gameplay/champion';

interface ChampionTooltipProps {
  champion: Champion;
  top: number;
  left: number;
  height: number;
}

const ChampionTooltip: React.FC<ChampionTooltipProps> = ({
  champion,
  top,
  left,
  height,
}) => {
  const theme = useMantineTheme();
  const tooltipStyles = {
    position: 'absolute',
    top: top,
    left: left,
    borderStyle: 'solid',
    borderColor: theme.other.tierToColorMap[champion.tier].light,
    borderWidth: '3px',
    backgroundImage: `url(${champion.splashPath})`,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backgroundBlendMode: 'lighten',
    backgroundSize: '100%',
    padding: '10px',
    borderRadius: '5px',
    height: height,
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  } as MantineStyleProp;

  return (
    <Box style={tooltipStyles}>
      <h3>{champion.name}</h3>
      <h5>{champion.traits.map((trait) => trait.name).join(', ')}</h5>
    </Box>
  );
};

export default ChampionTooltip;
