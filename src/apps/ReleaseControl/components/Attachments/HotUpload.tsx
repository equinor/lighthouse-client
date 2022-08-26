import { Banner } from '@equinor/eds-core-react';
import { useCallback, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { uploadAttachment } from '../../api/releaseControl/Request';
import { useReleaseControlContext, useReleaseControlMutation } from '../../hooks';
import { releaseControlMutationKeys } from '../../queries/releaseControlMutationKeys';
import { Attachments } from './Attachments';
import { HotUploadWrapper } from './attachments.styles';

const MAX_SIZE_IN_BYTES = 100 * 1000 ** 2;
export const HotUpload = (): JSX.Element => {
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

    const releaseControlId = useReleaseControlContext((s) => s.releaseControl.id);

    const { uploadAttachmentKey } = releaseControlMutationKeys(releaseControlId);

    const { isLoading, mutate } = useReleaseControlMutation(
        releaseControlId,
        uploadAttachmentKey,
        uploadAttachment,
        {
            retry: 2,
            retryDelay: 2,
        }
    );

    const onDrop = useCallback(
        async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            setRejectedFiles(fileRejections);
            if (acceptedFiles[0]) {
                acceptedFiles.forEach((file) =>
                    mutate({ file: file, releaseControlId: releaseControlId })
                );
            }
        },
        [mutate, releaseControlId]
    );

    return (
        <HotUploadWrapper>
            <Attachments onDrop={onDrop} maxSizeInBytes={MAX_SIZE_IN_BYTES} isLoading={isLoading} />

            {rejectedFiles && rejectedFiles.length > 0 && (
                <>
                    {rejectedFiles.map((rejectedFile) => {
                        return (
                            <Banner key={rejectedFile.file.name}>
                                <Banner.Message>{`${rejectedFile.file.name} could not be added, reason: ${rejectedFile.errors[0].code}`}</Banner.Message>
                            </Banner>
                        );
                    })}
                </>
            )}
        </HotUploadWrapper>
    );
};
