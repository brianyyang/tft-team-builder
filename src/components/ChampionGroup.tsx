import ChampionSelectButton from '@/components/ChampionSelectButton';
import { Flex } from '@mantine/core';
import styles from '@/css/styles.module.css';

interface ChampionGroupProps {
  champions: Champion[];
  imageWidth: number;
  imageHeight: number;
}

const ChampionGroup: React.FC<ChampionGroupProps> = ({
  champions,
  imageWidth,
  imageHeight,
}) => {
  return (
    <Flex className={styles.container}>
      {champions.map((champion) => (
        <ChampionSelectButton
          key={champion.id}
          imagePath={champion.iconPath}
          championName={champion.name}
          width={imageWidth}
          height={imageHeight}
        />
      ))}
    </Flex>
  );
};

export default ChampionGroup;
