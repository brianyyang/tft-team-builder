import { Champion } from '@/types/gameplay/champion';
import { ActiveTrait } from '@/types/gameplay/trait';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { TIERS } from '../utils/TiersUtils';

interface ChampionDatasetContextType {
  setNumber: number;
  setSetNumber: (setNumber: number) => void;
  championDataset: Champion[];
  traitDataset: ActiveTrait[];
  tierMap: Map<number, Champion[]>;
  isLoadingData: boolean;
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
  // typescript was complaining when I was trying to typeset the useState
  const typedMap: Map<number, Champion[]> = new Map();
  const [tierMap, setTierMap] = useState(typedMap);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const sortByTiers = (champions: Champion[]): Map<number, Champion[]> => {
    let newTierMap = new Map<number, Champion[]>();
    TIERS.forEach((tier) => {
      newTierMap.set(tier, []);
    });
    champions.forEach((champion) => {
      newTierMap.get(champion.tier)?.push(champion);
    });

    return newTierMap;
  };

  // load champion and trait data when set number changes
  useEffect(() => {
    setIsLoadingData(true);
    const loadSetData = async () => {
      try {
        const championsData = await import(
          `@/data/set${setNumber}/champions.json`
        );
        setChampionDataset(Object.values(championsData));
      } catch (error) {
        console.error('Error loading champions:', error);
      }
      try {
        const traitsData = await import(`@/data/set${setNumber}/traits.json`);
        setTraitDataset(Object.values(traitsData));
      } catch (error) {
        console.error('Error loading champions:', error);
      }
      setIsLoadingData(false);
    };

    loadSetData();
  }, [setNumber]);

  // load tier map when trait data is loaded
  useEffect(() => {
    if (championDataset.length > 0) {
      setTierMap(sortByTiers(championDataset));
    }
  }, [championDataset]);

  return (
    <ChampionDatasetContext.Provider
      value={{
        setNumber,
        setSetNumber,
        championDataset,
        traitDataset,
        tierMap,
        isLoadingData,
      }}
    >
      {children}
    </ChampionDatasetContext.Provider>
  );
};
