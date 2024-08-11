import { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedTeamContextType {
  selectedChampions: Champion[];
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
  const [selectedChampions, setSelectedChampions] = useState<Champion[]>(
    defaultChampions || []
  );

  const toggleChampion = (champion: Champion) => {
    const newList: Champion[] = [];
    let championAdded = false;
    let championFound = false;

    for (const currentChampion of selectedChampions) {
      if (currentChampion.id === champion.id) {
        // Champion is already in the list; do not add it
        championFound = true;
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
      }

      // Add the current champion
      newList.push(currentChampion);
    }

    // If the champion was not added, it means it should be added at the end
    if (!championFound && !championAdded) {
      newList.push(champion);
    }

    setSelectedChampions(newList);
  };

  return (
    <SelectedTeamContext.Provider value={{ selectedChampions, toggleChampion }}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
