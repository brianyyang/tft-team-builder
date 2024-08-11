import { MantineTheme } from '@mantine/core';

// Extend the MantineTheme interface
export interface CustomMantineTheme extends MantineTheme {
  tierToColorMap: {
    [key: number]: string;
  };
}
