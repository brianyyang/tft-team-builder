import ChampionImage from '@/components/ChampionImage';

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
    <div>
      {champions.map((champion) => (
        <ChampionImage
          imagePath={champion.iconPath}
          championName={champion.name}
          width={imageWidth}
          height={imageHeight}
        />
      ))}
    </div>
  );
};

export default ChampionGroup;
