import { Box } from '@mantine/core';
import { useSelectedTeam } from '../contexts/SelectedTeamContext';
import TraitHex from './TraitHex';
import { ActiveTrait } from '@/types/gameplay/trait';

const ActiveTraitGroup: React.FC = () => {
  const { activeTraits } = useSelectedTeam();
  const activeTraitsFlattened = Array.from(activeTraits.values());

  return (
    <Box style={{ display: 'flex', flexDirection: 'row' }}>
      {activeTraitsFlattened
        .toSorted((traitA, traitB) => traitB.activeCount - traitA.activeCount)
        .map(
          (trait: ActiveTrait) =>
            trait.activeCount > 0 && (
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <TraitHex
                  trait={trait}
                  width={64}
                  height={64}
                  key={`${trait.name}_count`}
                />
                {trait.activeCount}
              </Box>
            )
        )}
    </Box>
  );
};

export default ActiveTraitGroup;
