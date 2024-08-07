import { Flex } from '@mantine/core';
import ChampionSelectButton from '@/components/ChampionSelectButton';
import styles from '@/css/styles.module.css';

interface ChampionGroupProps {
  champions: Champion[];
  isFullImage: boolean;
  imageWidth: number;
  imageHeight: number;
  onClick: (champion: Champion) => void;
}

const ChampionGroup: React.FC<ChampionGroupProps> = ({
  champions,
  isFullImage,
  imageWidth,
  imageHeight,
  onClick,
}) => {
  const smallChampionGroup = (
    <Flex className={styles.rowContainer}>
      {champions.map((champion) => (
        <ChampionSelectButton
          key={champion.id + 'small'}
          champion={champion}
          isFullImage={false}
          width={imageWidth}
          height={imageHeight}
          onClick={onClick}
        />
      ))}
    </Flex>
  );

  const bigChampionGroup = (
    <Flex className={styles.rowContainer}>
      {champions.map((champion) => (
        <ChampionSelectButton
          key={champion.id + 'big'}
          champion={champion}
          isFullImage={true}
          width={imageWidth}
          height={imageHeight}
          onClick={onClick}
        />
      ))}
    </Flex>
  );

  return isFullImage ? bigChampionGroup : smallChampionGroup;
};

export default ChampionGroup;
