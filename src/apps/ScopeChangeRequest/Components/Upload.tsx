import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import styled from 'styled-components';

interface UploadProps {
    attachments: File[];
    setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
}

export const Upload = ({ attachments, setAttachments }: UploadProps): JSX.Element => {
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
    const maxSize = 100 * 1000 ** 2;
    const addFile = useCallback(
        async (file: File) => {
            setAttachments((prev) => [...prev, file]);
        },
        [setAttachments]
    );

    const removeAttachment = async (attachmentName: string | undefined) => {
        if (!attachmentName) return;
        setAttachments((prev) => prev.filter((x) => x.name !== attachmentName));
    };

    const onDrop = useCallback(
        (acceptedFiles, fileRejections: FileRejection[]) => {
            setRejectedFiles(fileRejections);
            if (acceptedFiles[0]) {
                addFile(acceptedFiles[0]);
            }
        },
        [addFile]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxSize: maxSize,
    });

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
                    <span style={{ fontSize: '12px' }}>Max size: {maxSize / 1000 ** 2}MB</span>
                </DropHere>
            </AttachmentsContainer>
            {attachments.map((attachment, i) => {
                return (
                    <AttachmentsList key={i}>
                        <a
                            href={URL.createObjectURL(attachment)}
                            download
                            style={{
                                color: `${tokens.colors.interactive.primary__resting.rgba}`,
                                cursor: 'pointer',
                            }}
                        >
                            {attachment.name}
                        </a>
                        <Inline>
                            <div>
                                {attachment.size && (attachment?.size / 1000 ** 2).toFixed(2)}MB /
                                {maxSize / 1000 ** 2}MB
                            </div>
                            <Icon
                                style={{ margin: '0em 0.5em' }}
                                color={tokens.colors.interactive.primary__resting.rgba}
                                onClick={() => removeAttachment(attachment.name)}
                                name="delete_forever"
                            />
                        </Inline>
                    </AttachmentsList>
                );
            })}
            {rejectedFiles && rejectedFiles.length > 0 && (
                <div style={{ color: 'red' }}>
                    The following files could not be added
                    {rejectedFiles.map((x) => {
                        return (
                            <div
                                key={x.file.name}
                            >{`${x.file.name} - Reason:  ${x.errors[0].code}`}</div>
                        );
                    })}
                </div>
            )}
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
