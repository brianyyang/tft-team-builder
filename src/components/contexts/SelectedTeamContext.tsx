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
    if (
      selectedChampions.some(
        (selectedChamp) => selectedChamp.id === champion.id
      )
    ) {
      setSelectedChampions(
        selectedChampions.filter(
          (selectedChamp) => selectedChamp.id !== champion.id
        )
      );
    } else {
      setSelectedChampions([...selectedChampions, champion]);
    }
  };

  return (
    <SelectedTeamContext.Provider value={{ selectedChampions, toggleChampion }}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
