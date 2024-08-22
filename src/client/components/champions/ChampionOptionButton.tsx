import { useEffect, useState } from 'react';
import { useMantineTheme, Button, Box } from '@mantine/core';
import { useSelectedTeam } from '../../contexts/SelectedTeamContext';
import { Champion } from '@/client/types/gameplay/champion';
import ChampionTooltip from './ChampionTooltip';

interface ChampionOptionButtonProps {
  champion: Champion;
  height: number;
  width: number;
}

interface Position {
  top: number;
  right: number;
}

const ChampionOptionButton: React.FC<ChampionOptionButtonProps> = ({
  champion,
  width,
  height,
}) => {
  const theme = useMantineTheme();
  const { selectedChampions, toggleChampion } = useSelectedTeam();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLongHovered, setIsLongHovered] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ top: 0, right: 0 });
  const componentId = `${champion.id}_option_button`;

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isHovered) {
      timer = setTimeout(() => {
        const component = document.querySelector('.' + componentId);
        if (component) {
          const rect = component.getBoundingClientRect();
          setPosition({ top: rect.top, right: rect.right });
          setIsLongHovered(true);
        }
      }, 500); // show tooltip after half a second of hovering
    } else {
      clearTimeout(timer);
      setIsLongHovered(false);
    }

    // Cleanup the timer when the component is unmounted or hover state changes
    return () => clearTimeout(timer);
  }, [isHovered]);

  const buttonStyles = (
    width: number,
    height: number,
    tier: number,
    imageUrl: string,
    isSelected: boolean
  ) => ({
    borderStyle: 'solid',
    borderColor: isSelected
      ? 'rgb(209 207 189)'
      : theme.other.tierToColorMap[tier].light,
    borderWidth: '3px',
    outline: isSelected
      ? `1px solid ${theme.colors.selectedChampionHighlight}`
      : '',
    width: width,
    height: height,
    overflow: 'hidden',
    backgroundImage: `${
      isSelected || isHovered
        ? 'radial-gradient(circle, rgba(0,0,0,0) 25%, rgba(100,255,255,0.5) 75%, rgba(150,150,150,0.8) 100%),'
        : ''
    } url(${imageUrl})`,
    backgroundSize: '100%',
    cursor: 'pointer',
    boxShadow: isSelected ? '0px 0px 10px 2px rgba(255, 255, 190, .75)' : '',
    borderRadius: '5px',
  });

  return (
    <Box>
      <Button
        className={componentId}
        style={buttonStyles(
          width,
          height,
          champion.tier,
          champion.iconPath,
          selectedChampions.includes(champion)
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          toggleChampion(champion);
          setIsLongHovered(false);
        }}
      />
      {isLongHovered && !selectedChampions.includes(champion) && (
        <ChampionTooltip
          champion={champion}
          top={position.top}
          left={position.right + 10}
          height={height}
          width={width}
        />
      )}
    </Box>
  );
};

export default ChampionOptionButton;
