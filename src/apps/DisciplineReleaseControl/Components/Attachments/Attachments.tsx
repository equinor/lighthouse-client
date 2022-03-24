import { FileRejection, useDropzone } from 'react-dropzone';
import { Icon, Progress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface AttachmentsProps {
    onDrop: (acceptedFiles: any, fileRejections: FileRejection[]) => Promise<void>;
    maxSizeInBytes: number;
    isLoading?: boolean;
}

export function Attachments({ maxSizeInBytes, onDrop, isLoading }: AttachmentsProps): JSX.Element {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxSize: maxSizeInBytes,
    });

    return (
        <Wrapper>
            <AttachmentsContainer {...getRootProps()}>
                <DropHere>
                    <TextWrapper>
                        {isLoading ? (
                            <Progress.Dots color="primary" />
                        ) : (
                            <Icon
                                style={{ width: '32px', height: '32px' }}
                                name={'cloud_upload'}
                                color={tokens.colors.interactive.primary__resting.rgba}
                            />
                        )}

                        <input {...getInputProps()} />

                        <UploadText>
                            Drop files or <Highlight>browse</Highlight> to upload
                        </UploadText>
                    </TextWrapper>
                </DropHere>
            </AttachmentsContainer>
        </Wrapper>
    );
}

const TextWrapper = styled.div`
    display: flex;
    gap: 0.7em;
    flex-direction: column;
    align-items: center;
`;

const UploadText = styled.div`
    display: flex;
    font-size: 16px;
    gap: 0.2em;
`;

const Highlight = styled.div`
    color: ${tokens.colors.interactive.primary__resting.hex};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
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
