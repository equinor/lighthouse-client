import { Banner } from '@equinor/eds-core-react';
import { useCallback, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import styled from 'styled-components';
import { useScopeChangeContext } from '../../context/useScopeChangeAccessContext';
import { useScopeChangeMutation } from '../../hooks/react-Query/useScopechangeMutation';
import { uploadAttachment } from '../../api/ScopeChange/Request';
import { Attachments } from './Attachments';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';

const MAX_SIZE_IN_BYTES = 100 * 1000 ** 2;
export const HotUpload = (): JSX.Element => {
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

    const { request } = useScopeChangeContext();

    const { uploadAttachmentKey } = scopeChangeMutationKeys(request.id);

    const { isLoading, mutate } = useScopeChangeMutation(
        request.id,
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
                acceptedFiles.forEach((file) => mutate({ file: file, requestId: request.id }));
            }
        },
        [mutate, request.id]
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
