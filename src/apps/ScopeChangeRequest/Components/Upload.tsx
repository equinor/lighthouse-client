import { Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import styled from 'styled-components';

export const Upload = (): JSX.Element => {
    const reducer = (state: File[], action: File[] | number) => {
        if (Array.isArray(action) && action.length < 1) return [];
        if (Array.isArray(action)) return state.concat(action);
        else return state.filter((_: any, index: number) => index !== action);
    };
    const [state, dispatch] = useReducer(reducer, []);

    // useEffect(() => {
    //     dispatch([]);
    // }, []);

    const onFilesAdded = (files: File[]) => {
        dispatch(files);
    };

    const onFileRemoved = (index: number) => {
        dispatch(index);
    };

    const initialFileList: File[] = [];

    const onClick = useCallback(() => {
        document.getElementById('file-input')?.click();
    }, []);

    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (event && event.target && event.target.files) {
                onFilesAdded(Array.from(event.target.files));
            }
        },
        [onFilesAdded]
    );

    return (
        <>
            <AttachmentsContainer>
                <DropHere>
                    <Icon
                        style={{ width: '32px', height: '32px' }}
                        name={'cloud_upload'}
                        color={tokens.colors.interactive.primary__resting.rgba}
                    />
                    <input
                        onChange={onChangeHandler}
                        style={{ display: 'none' }}
                        type="file"
                        id="file-input"
                        multiple={true}
                    />

                    <span style={{ fontSize: '16px' }}>Drop files or browse to upload</span>
                </DropHere>
            </AttachmentsContainer>
            {state.map((attachment, i) => (
                <div key={i}>
                    <div>{attachment.name}</div>
                    <Icon onClick={() => onFileRemoved(i)} name="Delete" />
                </div>
            ))}
        </>
    );
};

const AttachmentsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96px;
    width: 592px;
    border: 2px dotted ${tokens.colors.interactive.primary__resting.hex};
`;

const DropHere = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
