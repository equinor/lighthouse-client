import { SingleSelect } from '@equinor/eds-core-react';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { OriginType } from '../../../../types/scopeChangeRequest';

export const OriginSourceSelect = (): JSX.Element => {
    const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

    const originSource = useAtomState(({ originSource }) => originSource ?? '');

    return (
        <SingleSelect
            items={['NCR', 'Punch', 'Query', /**'SWCR',**/ 'Not Applicable', 'DCR']}
            label={'Change origin'}
            meta="(Required)"
            value={originSource}
            placeholder="Select origin"
            handleSelectedItemChange={(change) =>
                updateAtom({
                    originSource: change.selectedItem as OriginType | undefined,
                    originSourceId: undefined,
                })
            }
        />
    );
};
