import { ActiveTrait } from '@/types/gameplay/trait';

export const createTraitsMap = (
  traits: ActiveTrait[]
): Map<string, ActiveTrait> => {
  const traitsMap = new Map<string, ActiveTrait>();
  traits.map((trait) =>
    traitsMap.set(
      trait.id,
      new ActiveTrait(
        trait.id,
        trait.name,
        trait.iconPath,
        trait.activeCount,
        trait.breakpoints
      )
    )
  );
  return traitsMap;
};

export const breakpointToColorMap = {
  unactivated: {
    light: 'rgb(26, 0, 51)',
    mid: 'rgb(26, 0, 51)',
    dark: 'rgb(26, 0, 51)',
  },
  bronze: { light: '#89552f', mid: '#363c3d', dark: '#452607' },
  silver: { light: '#a1babd', mid: '#145c1e', dark: '#809f9e' },
  gold: { light: '#e8bc50', mid: '#215b8d', dark: '#b07f2b' },
  chromatic: { light: '#e649f5', mid: '#59165f', dark: '#441349' },
  unique: { light: '#e58d30', mid: '#b45903', dark: '#e14f27' },
};
