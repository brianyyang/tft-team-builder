import { useMantineTheme, Card, Image, Badge, Group } from '@mantine/core';
import { useSelectedTeam } from '../contexts/SelectedTeamContext';
import TraitHex from '../traits/TraitHex';

interface SelectedChampionCardProps {
  champion: Champion;
  height: number;
  width: number;
}

const SelectedChampionCard: React.FC<SelectedChampionCardProps> = ({
  champion,
  width,
  height,
}) => {
  const theme = useMantineTheme();
  const { toggleChampion } = useSelectedTeam();

  const cardStyles = {
    overflow: 'hidden',
    cursor: 'pointer',
    borderRadius: '5px',
  };

  const imageStyles = (width: number, height: number) => ({
    width: width,
    height: height,
  });

  return (
    <Card style={cardStyles} onClick={() => toggleChampion(champion)}>
      <Group justify="center">
        <Card.Section>
          <Image
            src={champion.splashPath}
            style={imageStyles(width, height)}
          ></Image>
        </Card.Section>
        <Badge color={theme.other.tierToColorMap[champion.tier]} radius="sm">
          {champion.name}
        </Badge>
        {champion.traits.map((trait) => (
          <TraitHex trait={trait} width={36} height={36} />
        ))}
      </Group>
    </Card>
  );
};

export default SelectedChampionCard;
