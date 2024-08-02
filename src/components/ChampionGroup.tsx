import { Flex } from '@mantine/core';
import ChampionSelectButton from '@/components/ChampionSelectButton';
import styles from '@/css/styles.module.css';

interface ChampionGroupProps {
  champions: Champion[];
  imageWidth: number;
  imageHeight: number;
  onClick: (champion: Champion) => void;
}

const ChampionGroup: React.FC<ChampionGroupProps> = ({
  champions,
  imageWidth,
  imageHeight,
  onClick,
}) => {
  return (
    <Flex className={styles.rowContainer}>
      {champions.map((champion) => (
        <ChampionSelectButton
          key={champion.id}
          champion={champion}
          width={imageWidth}
          height={imageHeight}
          onClick={onClick}
        />
      ))}
    </Flex>
  );
};

export default ChampionGroup;
