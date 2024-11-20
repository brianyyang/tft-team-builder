import { breakpointToColorMap } from '@/client/utils/ActiveTraitUtils';
import { colors, typography, otherSettings } from './themeObjects';
import { tierToColorMap } from '@/client/utils/TiersUtils';
import { createTheme, MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = createTheme({
  colors: colors,
  other: {
    tierToColorMap: tierToColorMap,
    breakpointToColorMap: breakpointToColorMap,
  },
});

export default theme;
