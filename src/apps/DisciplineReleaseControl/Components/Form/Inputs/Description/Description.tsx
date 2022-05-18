import { TextField } from '@equinor/eds-core-react';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;
const updateDescription = (e) => {
    updateAtom({ description: e.target.value });
};
export const DescriptionInput = (): JSX.Element => {
    const description = useAtomState((s) => s.description);

    return (
        <TextField
            id={(Math.random() * 16).toString()}
            label="Scope description"
            multiline
            rows={3}
            placeholder="Why is this job needed, what is the size of the scope?"
            value={description}
            onChange={updateDescription}
            meta={'(Required)'}
        />
    );
};
