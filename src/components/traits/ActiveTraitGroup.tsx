import { Box } from '@mantine/core';
import { useSelectedTeam } from '../contexts/SelectedTeamContext';
import TraitHex from './TraitHex';
import { ActiveTrait } from '@/types/gameplay/trait';
import ActiveTraitHex from './ActiveTraitHex';

const ActiveTraitGroup: React.FC = () => {
  const { activeTraits } = useSelectedTeam();
  const activeTraitsFlattened = Array.from(activeTraits.values());

  return (
    <Box style={{ display: 'flex', flexDirection: 'row' }}>
      {activeTraitsFlattened
        .toSorted((trait1, trait2) => trait2.activeCount - trait1.activeCount)
        .map(
          (trait: ActiveTrait) =>
            trait.activeCount > 0 && (
              <ActiveTraitHex trait={trait} width={64} height={64} />
            )
        )}
    </Box>
  );
};

export default ActiveTraitGroup;
