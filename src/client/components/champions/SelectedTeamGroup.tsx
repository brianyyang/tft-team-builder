import { Flex } from '@mantine/core';
import SelectedChampionCard from '@/client/components/champions/SelectedChampionCard';
import { useSelectedTeam } from '../../contexts/SelectedTeamContext';
import styles from '@/client/css/styles.module.css';

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
    <Flex className={styles.rowContainer} style={{ gap: '15px' }}>
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
