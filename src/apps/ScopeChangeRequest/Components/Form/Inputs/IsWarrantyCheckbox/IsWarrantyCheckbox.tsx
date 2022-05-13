import { Checkbox } from '@equinor/eds-core-react';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';

export const IsWarrantyCaseCheckbox = (): JSX.Element => {
    const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

    const isChecked = useAtomState((s) => s.potentialWarrantyCase);

    return (
        <div>
            <Checkbox
                onChange={() => {
                    updateAtom({ potentialWarrantyCase: !isChecked });
                }}
                checked={isChecked}
                label="Potential warranty case"
            />
        </div>
    );
};
