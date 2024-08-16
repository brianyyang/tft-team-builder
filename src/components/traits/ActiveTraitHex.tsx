import { ActiveTrait } from '@/types/gameplay/trait';
import { Box, MantineStyleProp, useMantineTheme } from '@mantine/core';
import TraitHex from './TraitHex';

interface ActiveTraitHexProps {
  trait: ActiveTrait;
  width: number;
  height: number;
}

const ActiveTraitHex: React.FC<ActiveTraitHexProps> = ({
  trait,
  width,
  height,
}) => {
  const theme = useMantineTheme();
  const { nextBreakpoint, currentColor } = trait.currentBreakpointState();

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      key={`active_${trait.name}_container`}
    >
      <TraitHex
        trait={trait}
        width={width}
        height={height}
        key={`active_${trait.name}`}
        backgroundColor={`linear-gradient(180deg, ${theme.other.breakpointToColorMap[currentColor].light} 35%, ${theme.other.breakpointToColorMap[currentColor].dark} 65%)`}
        invertIconColor={currentColor !== 'unactivated'}
      />
      {trait.activeCount + (nextBreakpoint > 0 ? `/${nextBreakpoint}` : '')}
    </Box>
  );
};

export default ActiveTraitHex;
