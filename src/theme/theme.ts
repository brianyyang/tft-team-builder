import { colors, typography, otherSettings } from './themeObjects';
import { tierToColorMap } from '@/utils/TiersUtils';
import { createTheme, MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = createTheme({
  colors: colors,
  other: {
    tierToColorMap: tierToColorMap,
  },
});

export default theme;
