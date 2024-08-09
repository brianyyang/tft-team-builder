import { Flex } from '@mantine/core';
import SelectedChampionButton from '@/components/SelectedChampionButton';
import { useSelectedTeam } from './contexts/SelectedTeamContext';
import styles from '@/css/styles.module.css';

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
    <Flex className={styles.rowContainer}>
      {selectedChampions.map((champion) => (
        <SelectedChampionButton
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
