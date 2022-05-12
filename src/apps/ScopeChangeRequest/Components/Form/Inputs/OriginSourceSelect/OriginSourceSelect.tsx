import { SingleSelect } from '@equinor/eds-core-react';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { OriginType } from '../../../../types/scopeChangeRequest';

export const OriginSourceSelect = (): JSX.Element => {
    const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

    const originSource = useAtomState(({ originSource }) => originSource ?? '');

    return (
        <SingleSelect
            items={['NCR', 'Punch', 'Query', /**'SWCR',**/ 'NotApplicable', 'DCR']}
            label={'Change origin'}
            meta="(Required)"
            initialSelectedItem={originSource}
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
