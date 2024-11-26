import { Flex } from '@mantine/core';
import SelectedChampionCard from './SelectedChampionCard';
import { useSelectedTeam } from '../../../contexts/SelectedTeamContext';
import styles from './ChampionSelector.module.css';

interface SelectedTeamGroupProps {
  imageWidth: number;
  imageHeight: number;
}

const SelectedTeamGroup: React.FC<SelectedTeamGroupProps> = ({
  imageWidth,
  imageHeight,
}) => {
  const { selectedChampions } = useSelectedTeam();
  return (
    <Flex
      className={`${styles.rowContainer} ${styles.selectedChampionsGroup}`}
      style={{ gap: '18px' }}
    >
      {selectedChampions.map((champion) => (
        <SelectedChampionCard
          key={champion.id + 'big'}
          champion={champion}
          width={imageWidth}
          height={imageHeight}
        />
      ))}
    </Flex>
  );
};

export default SelectedTeamGroup;
