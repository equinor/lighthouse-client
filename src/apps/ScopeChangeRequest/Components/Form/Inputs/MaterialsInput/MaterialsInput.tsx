import { TextField } from '@equinor/eds-core-react';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { StyledCheckbox } from '../../StyledCheckbox/StyledCheckbox';

export const MaterialsInput = (): JSX.Element => {
    const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

    const { materialsIdentifiedInStorage, materialsNote, materialsToBeBoughtByContractor } =
        useAtomState((s) => ({
            materialsIdentifiedInStorage: s.materialsIdentifiedInStorage,
            materialsNote: s.materialsNote,
            materialsToBeBoughtByContractor: s.materialsToBeBoughtByContractor,
        }));

    const updateIdentifiedInStorage = () => {
        updateAtom({
            materialsIdentifiedInStorage: !materialsIdentifiedInStorage,
        });
    };

    const updateToBeBought = () => {
        updateAtom({
            materialsToBeBoughtByContractor: !materialsToBeBoughtByContractor,
        });
    };

    const updateMaterialDescription = (value: string | undefined) => {
        updateAtom({
            materialsNote: value,
        });
    };

    return (
        <div>
            <StyledCheckbox
                onChange={updateIdentifiedInStorage}
                value={materialsIdentifiedInStorage}
                label="Materials identified in storage"
            />

            <StyledCheckbox
                onChange={updateToBeBought}
                value={materialsToBeBoughtByContractor}
                label={'Materials to be bought by contractor'}
            />

            <TextField
                id={(Math.random() * 16).toString()}
                multiline
                rows={3}
                onInput={(e) => updateMaterialDescription(e.target.value)}
                label="Material note"
                value={materialsNote}
                placeholder="Please add description"
            />
        </div>
    );
};
