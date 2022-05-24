import { SingleSelect } from '@equinor/eds-core-react';
import { useQuery } from 'react-query';
import { DRCFormAtomApi } from '../../../../ReleaseControl/Atoms/formAtomApi';
import { releaseControlQueries } from '../../../../ReleaseControl/queries/queries';

export const PhaseSelect = (): JSX.Element => {
    const { phaseQuery } = releaseControlQueries;
    const { data: phases } = useQuery(phaseQuery);

    const { useAtomState, updateAtom } = DRCFormAtomApi;

    const phase = useAtomState(({ phase }) => phase);

    return (
        <SingleSelect
            items={phases ?? []}
            label={'Phase'}
            meta="(Required)"
            placeholder="Select phase"
            value={phase}
            disabled={false}
            handleSelectedItemChange={(e) =>
                updateAtom({
                    phase: e.selectedItem ?? undefined,
                })
            }
        />
    );
};
