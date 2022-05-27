import { TextField } from '@equinor/eds-core-react';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;
const updateTitle = (e) => {
    updateAtom({ title: e.target.value });
};

export const TitleInput = (): JSX.Element => {
    const title = useAtomState((s) => s.title);
    return (
        <TextField
            id={(Math.random() * 16).toString()}
            placeholder="This is a new flow"
            label="Title"
            onChange={updateTitle}
            value={title}
            meta={'(Required)'}
        />
    );
};
