import { Banner } from '@equinor/eds-core-react';
import { useCallback, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import styled from 'styled-components';
import { uploadAttachment } from '../../Api/Request';
import { ServerError } from '../../Api/Types/ServerError';
import { useReleaseControlMutationKeyGen } from '../../Hooks/React-Query/useReleaseControlMutationKeyGen';
import { useReleaseControlMutation } from '../../Hooks/useReleaseControlMutation';
import { useReleaseControlContext } from '../Sidesheet/Context/useReleaseControlAccessContext';
import { Attachments } from './Attachments';

const MAX_SIZE_IN_BYTES = 100 * 1000 ** 2;
export const HotUpload = (): JSX.Element => {
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

    const { process, setErrorMessage } = useReleaseControlContext();

    const { uploadAttachmentKey } = useReleaseControlMutationKeyGen(process.id);

    const { isLoading, mutateAsync } = useReleaseControlMutation(
        process.id,
        uploadAttachmentKey(),
        uploadAttachment,
        {
            retry: 2,
            retryDelay: 2,
            onError: (e: ServerError) => setErrorMessage(e),
        }
    );

    const onDrop = useCallback(
        async (acceptedFiles, fileRejections: FileRejection[]) => {
            setRejectedFiles(fileRejections);
            if (acceptedFiles[0]) {
                await mutateAsync({ file: acceptedFiles[0], processId: process.id });
            }
        },
        [mutateAsync, process.id]
    );

    return (
        <Wrapper>
            <Attachments onDrop={onDrop} maxSizeInBytes={MAX_SIZE_IN_BYTES} isLoading={isLoading} />

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
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
`;
