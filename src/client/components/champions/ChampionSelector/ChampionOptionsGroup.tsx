import { Flex } from '@mantine/core';
import ChampionOptionButton from './ChampionOptionButton';
import styles from './ChampionSelector.module.css';
import { Champion } from '@/types/gameplay/champion';

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
    <Flex className={`${styles.rowContainer} ${styles.championOptionsGroup}`}>
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
