import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { Attachment } from '../../../Types/scopeChangeRequest';

interface AttachmentProps {
    attachments: Attachment[];
    requestId: string;
}

const onClickDownloadAttachment = async (
    requestId: string,
    attachmentId: string,
    fileName: string
) => {
    const { scopeChange } = httpClient();

    const requestInit = {
        headers: {
            'Content-Type': 'application/pdf',
        },
    };

    await scopeChange
        .fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/attachments/${attachmentId}`,
            requestInit
        )
        .then((response) => response.blob())
        .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();
            if (link.parentNode) {
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            }
        });
};

export const Attachments = ({ attachments, requestId }: AttachmentProps): JSX.Element => {
    return (
        <div>
            {attachments &&
                attachments.map((x) => {
                    return (
                        <Wrapper key={x.id}>
                            <Link
                                onClick={() =>
                                    onClickDownloadAttachment(requestId, x.id, x.fileName)
                                }
                            >
                                <span>{x.fileName}</span>
                            </Link>
                            <span>{Math.round(x.fileSize / 1000 ** 2)}MB</span>
                        </Wrapper>
                    );
                })}
        </div>
    );
};

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 610px;
`;

export const Link = styled.a`
    display: flex;
    color: ${tokens.colors.interactive.primary__resting.rgba};
    cursor: pointer;
    textdecorationline: underline;
    padding: 8px 0px;
`;
