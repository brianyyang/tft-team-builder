import { ActiveTrait, Trait } from '@/types/gameplay/trait';
import { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedTeamContextType {
  selectedChampions: Champion[];
  activeTraits: Map<string, ActiveTrait>;
  toggleChampion: (champion: Champion) => void;
}

const SelectedTeamContext = createContext<SelectedTeamContextType | undefined>(
  undefined
);

export const useSelectedTeam = () => {
  const context = useContext(SelectedTeamContext);
  if (!context) {
    throw new Error(
      'useSelectedTeam must be used within a SelectedTeamProvider'
    );
  }
  return context;
};

interface SelectedTeamProviderProps {
  defaultChampions?: Champion[];
  children: ReactNode;
}

export const SelectedTeamProvider: React.FC<SelectedTeamProviderProps> = ({
  defaultChampions,
  children,
}) => {
  const addTraitToMap = (map: Map<string, ActiveTrait>, trait: Trait) => {
    map.has(trait.id)
      ? map.get(trait.id)?.addChampion()
      : map.set(trait.id, new ActiveTrait(trait.id, trait.name, 1, []));
    return map;
  };

  const removeTraitFromMap = (map: Map<string, ActiveTrait>, trait: Trait) => {
    map.get(trait.id)?.removeChampion();
    return map;
  };

  const startingActiveTraits = () => {
    const startingTraitsMap = new Map<string, ActiveTrait>();
    if (defaultChampions) {
      defaultChampions.map((champion) =>
        champion.traits.map((trait) => addTraitToMap(startingTraitsMap, trait))
      );
    }
    return startingTraitsMap;
  };

  const [selectedChampions, setSelectedChampions] = useState<Champion[]>(
    defaultChampions || []
  );
  const [activeTraits, setActiveTraits] = useState<Map<string, ActiveTrait>>(
    startingActiveTraits()
  );

  const toggleChampion = (champion: Champion) => {
    console.log(activeTraits);
    const newList: Champion[] = [];
    let championAdded = false;
    let championFound = false;

    for (const currentChampion of selectedChampions) {
      if (currentChampion.id === champion.id) {
        // Champion is already in the list; do not add it and remove its traits
        championFound = true;
        champion.traits.map((trait) =>
          setActiveTraits(removeTraitFromMap(activeTraits, trait))
        );
        continue;
      }

      if (
        !championFound &&
        !championAdded &&
        currentChampion.tier > champion.tier
      ) {
        // Add the new champion before the first champion with a greater tier
        newList.push(champion);
        championAdded = true;
        champion.traits.map((trait) =>
          setActiveTraits(addTraitToMap(activeTraits, trait))
        );
      }

      // Add the current champion
      newList.push(currentChampion);
    }

    // If the champion was not added, it means it should be added at the end
    if (!championFound && !championAdded) {
      newList.push(champion);
      champion.traits.map((trait) =>
        setActiveTraits(addTraitToMap(activeTraits, trait))
      );
    }

    setSelectedChampions(newList);
  };

  return (
    <SelectedTeamContext.Provider
      value={{ selectedChampions, activeTraits, toggleChampion }}
    >
      {children}
    </SelectedTeamContext.Provider>
  );
};
