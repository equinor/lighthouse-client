import { useQuery } from 'react-query';
import { DRCFormAtomApi } from '../../../../ReleaseControl/Atoms/formAtomApi';
import { releaseControlQueries } from '../../../../ReleaseControl/queries/queries';
import { Autocomplete } from '@equinor/eds-core-react';

export const PhaseSelect = (): JSX.Element => {
  const { phaseQuery } = releaseControlQueries;
  const { data: phases } = useQuery(phaseQuery);

  const { useAtomState, updateAtom } = DRCFormAtomApi;

  const phase = useAtomState(({ phase }) => phase);

  return (
    <Autocomplete
      options={phases ?? []}
      label="Phase"
      meta="(Required)"
      placeholder="Select phase"
      selectedOptions={[phase]}
      disabled={false}
      onOptionsChange={(change) =>
        updateAtom({
          phase: change.selectedItems[0] ?? undefined,
        })
      }
    />
  );
};
