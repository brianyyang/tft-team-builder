import { Champion } from '@/types/gameplay/champion';
import { ActiveTrait } from '@/types/gameplay/trait';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ChampionDatasetContextType {
  setNumber: number;
  setSetNumber: (setNumber: number) => void;
  championDataset: Champion[];
  setChampionDataset: (championDataset: Champion[]) => void;
  tierMap: Map<number, Champion[]>;
  setTierMap: (map: Map<number, Champion[]>) => void;
  traitDataset: ActiveTrait[];
  setTraitDataset: (trait: ActiveTrait[]) => void;
}

const ChampionDatasetContext = createContext<
  ChampionDatasetContextType | undefined
>(undefined);

export const useChampionDataset = () => {
  const context = useContext(ChampionDatasetContext);
  if (!context) {
    throw new Error(
      'useChampionDataset must be used within a ChampionDatasetProvider'
    );
  }
  return context;
};

interface ChampionDatasetProviderProps {
  defaultSetNumber: number;
  children: ReactNode;
}

export const ChampionDatasetProvider: React.FC<
  ChampionDatasetProviderProps
> = ({ children, defaultSetNumber }) => {
  const [setNumber, setSetNumber] = useState<number>(defaultSetNumber);
  const [championDataset, setChampionDataset] = useState<Champion[]>([]);
  const [traitDataset, setTraitDataset] = useState<ActiveTrait[]>([]);
  // type for the following map
  const typedTierMap: Map<number, Champion[]> = new Map();
  const [tierMap, setTierMap] = useState(typedTierMap);

  return (
    <ChampionDatasetContext.Provider
      value={{
        setNumber,
        setSetNumber,
        championDataset,
        setChampionDataset,
        traitDataset,
        setTraitDataset,
        tierMap,
        setTierMap,
      }}
    >
      {children}
    </ChampionDatasetContext.Provider>
  );
};
