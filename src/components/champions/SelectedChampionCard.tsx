import { useMantineTheme, MantineStyleProp, Box } from '@mantine/core';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useSelectedTeam } from '../contexts/SelectedTeamContext';
import TraitHex from '../traits/TraitHex';

interface SelectedChampionCardProps {
  champion: Champion;
  height: number;
  width: number;
}

const traitContainer = {
  display: 'flex',
  width: '100%',
  height: '50%',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'end',
  alignContent: 'start',
  marginBottom: '2px',
} as MantineStyleProp;

const closeButtonContainer = {
  display: 'flex',
  justifyContent: 'end',
  width: '100%',
  height: '50%',
};

const SelectedChampionCard: React.FC<SelectedChampionCardProps> = ({
  champion,
  width,
  height,
}) => {
  const theme = useMantineTheme();
  const { toggleChampion } = useSelectedTeam();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const cardStyles = (isHovered: boolean) => ({
    overflow: 'hidden',
    borderRadius: '10px',
    outline: isHovered
      ? `3px solid ${theme.other.tierToColorMap[champion.tier].light}`
      : '',
    boxShadow: isHovered ? '0px 0px 10px 2px rgba(255, 255, 190, .75)' : '',
  });

  const imageStyles = (width: number, height: number, imageUrl: string) =>
    ({
      display: 'flex',
      width: width,
      height: height,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: '100%',
      alignItems: 'end',
      flexDirection: 'column',
    } as MantineStyleProp);

  const labelStyles = {
    background: `linear-gradient(315deg, ${
      theme.other.tierToColorMap[champion.tier].light
    }, ${theme.other.tierToColorMap[champion.tier].mid}, ${
      theme.other.tierToColorMap[champion.tier].dark
    })`,
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1.25em',
  };

  const closeButtonStyles = (isHovered: boolean) => ({
    cursor: 'pointer',
    width: '25%',
    height: '50%',
    backgroundColor: 'transparent',
    display: isHovered ? 'block' : 'none',
  });

  return (
    <Box
      style={cardStyles(isHovered)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box style={imageStyles(width, height, champion.splashPath)}>
        <Box style={closeButtonContainer}>
          <IoCloseOutline
            style={closeButtonStyles(isHovered)}
            onClick={() => toggleChampion(champion)}
          />
        </Box>
        <Box style={traitContainer}>
          {champion.traits.map((trait) => (
            <TraitHex
              trait={trait}
              width={width / 5}
              height={height / 5}
              key={`${champion.name}_${trait.name}`}
            />
          ))}
        </Box>
      </Box>
      <Box style={labelStyles}>{champion.name}</Box>
    </Box>
  );
};

export default SelectedChampionCard;
