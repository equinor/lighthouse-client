import { TypedSelectOption } from '@equinor/Workflow';
import { SearchReferences } from '../../../../../ScopeChangeRequest/Components/SearchReferences/SearchReferences';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;

const updateReferences = (newVals: TypedSelectOption[]) => {
    updateAtom({ references: newVals });
};

export const ReferencesInput = (): JSX.Element => {
    const references = useAtomState((s) => s.references) ?? [];
    return (
        <SearchReferences
            onChange={updateReferences}
            references={references}
            options={{ referenceTypes: ['punch', 'document', 'scopechangerequest'] }}
        />
    );
};
