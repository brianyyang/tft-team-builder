import { Flex } from '@mantine/core';
import ChampionOptionButton from '@/components/ChampionOptionButton';
import styles from '@/css/styles.module.css';

interface ChampionOptionGroupProps {
  champions: Champion[];
  imageWidth: number;
  imageHeight: number;
}

const ChampionOptionsGroup: React.FC<ChampionOptionGroupProps> = ({
  champions,
  imageWidth,
  imageHeight,
}) => {
  return (
    <Flex className={styles.rowContainer}>
      {champions.map((champion) => (
        <ChampionOptionButton
          key={champion.id + 'small'}
          champion={champion}
          width={imageWidth}
          height={imageHeight}
        />
      ))}
    </Flex>
  );
};

export default ChampionOptionsGroup;
