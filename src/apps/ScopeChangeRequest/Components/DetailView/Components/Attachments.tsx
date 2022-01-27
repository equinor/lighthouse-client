import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Attachment } from '../../../Types/scopeChangeRequest';

interface AttachmentProps {
    attachments: Attachment[];
    requestId: string;
}

export const Attachments = ({ attachments, requestId }: AttachmentProps): JSX.Element => {
    return (
        <div>
            {attachments &&
                attachments.map((x) => {
                    return (
                        <Wrapper key={x.id}>
                            <Link
                                href={`https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/attachments/${x.id}`}
                                download
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
