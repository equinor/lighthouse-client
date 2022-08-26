import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Attachment } from '../../types/releaseControl';

interface AttachmentProps {
    attachments: Attachment[];
    releaseControlId: string;
}

const onClickDownloadAttachment = async (
    releaseControlId: string,
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
        .fetch(`api/releasecontrol/${releaseControlId}/attachments/${attachmentId}`, requestInit)
        .then((response) => {
            if (!response.ok) throw new Error('Failed to get attachment');
            return response.blob();
        })
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

            //cleanup
            link.remove();
        });
};

export const Attachments = ({ attachments, releaseControlId }: AttachmentProps): JSX.Element => {
    return (
        <div>
            {attachments &&
                attachments.map((attachment) => {
                    return (
                        <Wrapper key={attachment.id}>
                            <Link
                                onClick={() => {
                                    onClickDownloadAttachment(
                                        releaseControlId,
                                        attachment.id,
                                        attachment.fileName
                                    );
                                }}
                            >
                                <AttachmentsName style={{ fontSize: '16px' }}>
                                    {attachment.fileName}
                                </AttachmentsName>
                            </Link>
                            <AttachmentsSize>
                                {Math.round(attachment.fileSize / 1000 ** 2)} MB
                            </AttachmentsSize>
                        </Wrapper>
                    );
                })}
        </div>
    );
};

const AttachmentsSize = styled.div`
    font-size: 16px;
    line-height: 20px;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
    text-decoration: underline;
`;

const AttachmentsName = styled.div`
    font-size: 16px;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Link = styled.a`
    display: flex;
    color: ${tokens.colors.interactive.primary__resting.rgba};
    cursor: pointer;
    text-decoration: underline;
    padding: 8px 0px;
`;
