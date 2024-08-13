import { ActiveTrait } from '@/types/gameplay/trait';
import traits from '@/data/traits.json';

export const setTraitsMap: () => Map<string, ActiveTrait> = () => {
  const traitsMap = new Map<string, ActiveTrait>();
  traits.map((trait) =>
    traitsMap.set(
      trait.id,
      new ActiveTrait(
        trait.id,
        trait.name,
        trait.activeCount,
        trait.breakpoints
      )
    )
  );
  return traitsMap;
};
