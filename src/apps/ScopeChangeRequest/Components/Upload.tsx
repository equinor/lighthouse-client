import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useCallback, useReducer } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

export const Upload = (): JSX.Element => {
    const reducer = (state: File[], action: File[] | number) => {
        if (Array.isArray(action) && action.length < 1) return [];
        if (Array.isArray(action)) return state.concat(action);
        else return state.filter((_: any, index: number) => index !== action);
    };
    const [state, dispatch] = useReducer(reducer, []);
    const onDrop = useCallback((acceptedFiles) => {
        onFilesAdded(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxSize: 42000000,
    });

    const onFilesAdded = (files: File[]) => {
        dispatch(files);
    };

    const onFileRemoved = (index: number) => {
        dispatch(index);
    };

    return (
        <Wrapper>
            <AttachmentsContainer {...getRootProps()}>
                <DropHere>
                    <Icon
                        style={{ width: '32px', height: '32px' }}
                        name={'cloud_upload'}
                        color={tokens.colors.interactive.primary__resting.rgba}
                    />
                    <input {...getInputProps()} />

                    <span style={{ fontSize: '16px' }}>Drop files or browse to upload</span>
                </DropHere>
            </AttachmentsContainer>
            {state.map((attachment, i) => (
                <AttachmentsList key={i}>
                    <div>{attachment.name}</div>
                    <Inline>
                        <div>{(attachment.size / 1000 ** 2).toFixed(2)}MB / 42.00MB</div>
                        <Icon
                            style={{ margin: '0em 0.5em' }}
                            color={tokens.colors.interactive.primary__resting.rgba}
                            onClick={() => onFileRemoved(i)}
                            name="delete_forever"
                        />
                    </Inline>
                </AttachmentsList>
            ))}
        </Wrapper>
    );
};

const Inline = styled.span`
    display: flex;
    align-items: center;
`;

const AttachmentsList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.5em 0em;
    font-size: 16px;
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const AttachmentsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96px;
    width: 592px;
    cursor: pointer;
    border: 2px dotted ${tokens.colors.interactive.primary__resting.hex};
`;

const DropHere = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
`;
