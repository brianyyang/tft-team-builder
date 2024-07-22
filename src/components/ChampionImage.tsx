import Image from 'next/image';

// Define the props interface
interface ChampionImageProps {
  imagePath: string;
  championName: string;
  height: number;
  width: number;
}

const ChampionImage: React.FC<ChampionImageProps> = ({
  imagePath,
  championName,
  ...rest
}) => {
  return <Image src={imagePath} alt={championName} {...rest} />;
};

export default ChampionImage;
