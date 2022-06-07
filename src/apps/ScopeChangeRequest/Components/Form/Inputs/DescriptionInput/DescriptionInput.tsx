import { TextField } from '@equinor/eds-core-react';
import { useCallback } from 'react';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';

export const DescriptionInput = (): JSX.Element => {
    const { updateAtom, useAtomState } = scopeChangeFormAtomApi;

    const description = useAtomState((s) => s.description ?? '');

    const calculateRowLength = useCallback((): number => {
        return description.split('\n').length > 5 ? description.split('\n').length : 5;
    }, [description]);

    return (
        <TextField
            id={Math.random().toString()}
            value={description}
            rows={calculateRowLength()}
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
