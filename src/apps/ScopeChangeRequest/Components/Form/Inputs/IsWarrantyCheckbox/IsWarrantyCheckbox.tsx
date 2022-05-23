import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { StyledCheckbox } from '../../StyledCheckbox/StyledCheckbox';

export const IsWarrantyCaseCheckbox = (): JSX.Element => {
    const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

    const isChecked = useAtomState((s) => s.potentialWarrantyCase);

    return (
        <StyledCheckbox
            value={isChecked}
            onChange={() => {
                updateAtom({ potentialWarrantyCase: !isChecked });
            }}
            label="Potential warranty case"
        />
    );
};
