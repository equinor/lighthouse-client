import { SingleSelect } from '@equinor/eds-core-react';
import { useQuery } from 'react-query';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { scopeChangeQueries } from '../../../../keys/queries';

export const PhaseSelect = (): JSX.Element => {
    const { phaseQuery } = scopeChangeQueries;
    const { data: phases } = useQuery(phaseQuery);

    const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

    const phase = useAtomState(({ phase }) => phase);

    return (
        <SingleSelect
            items={phases ?? []}
            label={'Change category'}
            meta="(Required)"
            placeholder="Select category"
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
