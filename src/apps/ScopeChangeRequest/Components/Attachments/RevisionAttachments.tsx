import { Banner } from '@equinor/eds-core-react-old';
import { useCallback, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import styled from 'styled-components';

import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { Attachments } from './Attachments';
import { AttachmentVisual } from './AttachmentVisual';
import { MAX_SIZE_IN_BYTES } from './Upload';

export function RevisionAttachments(): JSX.Element {
    const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

    const { newAttachments, attachmentsToDuplicate, oldAttachments } = useAtomState(
        ({ newAttachments, attachmentsToDuplicate, revisionAttachments }) => ({
            newAttachments: newAttachments ?? [],
            attachmentsToDuplicate: attachmentsToDuplicate,
            oldAttachments: revisionAttachments,
        })
    );

    const handleAttachmentsChanged = useCallback(
        (attachments: File[]) => scopeChangeFormAtomApi.updateAtom({ newAttachments: attachments }),
        []
    );

    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
    const addFiles = useCallback(
        async (files: File[]) => handleAttachmentsChanged([...newAttachments, ...files]),
        [newAttachments, handleAttachmentsChanged]
    );

    const removeNewAttachment = async (attachmentName: string | undefined) => {
        if (!attachmentName) return;
        handleAttachmentsChanged(newAttachments.filter((x) => x.name !== attachmentName));
    };

    const removeRevisionAttachment = (name: string) =>
        updateAtom({
            attachmentsToDuplicate: attachmentsToDuplicate?.filter(
                (s) => s !== oldAttachments?.find((s) => s.fileName === name)?.id
            ),
        });

    const onDrop = useCallback(
        async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            setRejectedFiles(fileRejections);
            addFiles(acceptedFiles);
        },
        [addFiles]
    );

    return (
        <>
            <Attachments onDrop={onDrop} maxSizeInBytes={MAX_SIZE_IN_BYTES} />
            <AttachmentsList>
                {newAttachments.map(({ name, size }) => (
                    <AttachmentVisual
                        key={name}
                        fileSize={size}
                        name={name}
                        onRemove={removeNewAttachment}
                    />
                ))}
                {oldAttachments
                    ?.filter(({ id }) => attachmentsToDuplicate?.includes(id))
                    .map(({ id, fileName, fileSize }) => (
                        <AttachmentVisual
                            key={id}
                            name={fileName}
                            fileSize={fileSize}
                            onRemove={removeRevisionAttachment}
                        />
                    ))}
            </AttachmentsList>
            {rejectedFiles && rejectedFiles.length > 0 && (
                <>
                    {rejectedFiles.map((x) => {
                        return (
                            <Banner key={x.file.name}>
                                <Banner.Message>{`${x.file.name} could not be added, reason: ${x.errors[0].code}`}</Banner.Message>
                            </Banner>
                        );
                    })}
                </>
            )}
        </>
    );
}

const AttachmentsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3em;
`;
