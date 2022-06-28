import { scopeChangeFormAtomApi } from '../../../Atoms/FormAtomApi/formAtomApi';
import { StyledCheckbox } from '../StyledCheckbox/StyledCheckbox';

export const IsATSScopeCheckbox = (): JSX.Element => {
    const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

    const isChecked = useAtomState((s) => s.potentialAtsScope);

    return (
        <StyledCheckbox
            value={isChecked}
            onChange={() => {
                updateAtom({ potentialAtsScope: !isChecked });
            }}
            label="Potential ATS scope"
        />
    );
};
