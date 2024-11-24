import { Champion } from '@/types/gameplay/champion';
import { ActiveTrait } from '@/types/gameplay/trait';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface ChampionDatasetContextType {
  setNumber: number;
  setSetNumber: (setNumber: number) => void;
  championDataset: Champion[];
  traitDataset: ActiveTrait[];
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

  // load champion and trait data when set number changes
  useEffect(() => {
    const loadSetData = async () => {
      try {
        const championsData = await import(
          `@/data/set${setNumber}/champions.json`
        );
        setChampionDataset(championsData);
      } catch (error) {
        console.error('Error loading champions:', error);
      }
      try {
        const traitsData = await import(`@/data/set${setNumber}/traits.json`);
        setTraitDataset(traitsData);
      } catch (error) {
        console.error('Error loading champions:', error);
      }
    };

    loadSetData();
  }, [setNumber]);

  return (
    <ChampionDatasetContext.Provider
      value={{
        setNumber,
        setSetNumber,
        championDataset,
        traitDataset,
      }}
    >
      {children}
    </ChampionDatasetContext.Provider>
  );
};
