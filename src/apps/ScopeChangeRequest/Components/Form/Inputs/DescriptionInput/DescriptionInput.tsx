import { useCallback } from 'react';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { SimpleMdeReact } from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const options = {
    spellChecker: false,
    toolbar: ['heading-3', 'bold', 'italic', 'unordered-list', 'ordered-list'],
    maxHeight: '200px',
    status: false,
    lineWrapping: true,
    direction: 'ltr',
    placeholder: 'Please enter scope description',
} as SimpleMDE.Options;

const DescriptionHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.333em;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
`;
export const DescriptionInput = (): JSX.Element => {
    const { updateAtom, useAtomState } = scopeChangeFormAtomApi;

    const description = useAtomState((s) => s.description ?? '');

    const onChange = useCallback(
        (e: string) => {
            updateAtom({ description: e });
        },
        [updateAtom]
    );
    return (
        <div>
            <DescriptionHeader>
                <div>Description</div>
                <div>(Required)</div>
            </DescriptionHeader>
            <SimpleMdeReact value={description} onChange={onChange} options={options} />
        </div>
    );
};
