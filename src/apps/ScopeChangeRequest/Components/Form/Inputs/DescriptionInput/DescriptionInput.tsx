import { TextField } from '@equinor/eds-core-react';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';

export const DescriptionInput = (): JSX.Element => {
    const { updateAtom, useAtomState } = scopeChangeFormAtomApi;

    const description = useAtomState((s) => s.description ?? '');

    return (
        <TextField
            id={Math.random().toString()}
            value={description}
            rows={5}
            label={'Description'}
            multiline
            placeholder={'Please enter scope description'}
            type={'text'}
            onInput={(e) => {
                updateAtom({ description: e.target.value });
            }}
            meta={'(Required)'}
        />
    );
};
