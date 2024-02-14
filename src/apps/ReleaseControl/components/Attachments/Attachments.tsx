import { FileRejection, useDropzone } from 'react-dropzone';
import { Icon, Progress } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import {
    AttachmentsContainer,
    DropHere,
    Highlight,
    TextWrapper,
    UploadText,
    Wrapper,
} from './attachments.styles';

interface AttachmentsProps {
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => Promise<void>;
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
