import { CustomMantineTheme } from './CustomMantineTheme';
import { colors, typography, otherSettings } from './themeObjects';
import { tierToColorMap } from '@/utils/TiersUtils';
import { MantineThemeOverride } from '@mantine/core';

// Create a theme override object to get the default properties of a MantineTheme
const defaultThemeValues: MantineThemeOverride = {
  colors: colors,
};

const theme: CustomMantineTheme = {
  ...defaultThemeValues,
  tierToColorMap: tierToColorMap,
} as CustomMantineTheme;

export default theme;
