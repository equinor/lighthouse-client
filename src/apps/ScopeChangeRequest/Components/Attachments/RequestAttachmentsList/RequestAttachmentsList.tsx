import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { deleteAttachment } from '../../../api/ScopeChange/Request';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { useScopeChangeMutation } from '../../../hooks/React-Query/useScopechangeMutation';
import { scopeChangeMutationKeys } from '../../../keys/scopeChangeMutationKeys';
import { AttachmentsList, AttachmentName, Inline } from '../../Form/ScopeChangeForm.styles';

export const RequestAttachmentsList = (): JSX.Element => {
    const { attachments, id } = useScopeChangeContext((s) => ({
        attachments: s.request.attachments,
        id: s.request.id,
    }));

    const { deleteAttachmentKey } = scopeChangeMutationKeys(id);
    const { mutate: removeAttachment } = useScopeChangeMutation(
        id,
        deleteAttachmentKey,
        deleteAttachment
    );

    return (
        <div>
            {attachments.map((attachment, i) => {
                return (
                    <AttachmentsList key={i}>
                        <AttachmentName>{attachment.fileName}</AttachmentName>
                        <Inline>
                            <div>
                                {attachment.fileSize &&
                                    (attachment?.fileSize / 1000 ** 2).toFixed(2)}
                                MB
                            </div>
                            <Icon
                                style={{ margin: '0em 0.5em' }}
                                color={tokens.colors.interactive.primary__resting.rgba}
                                onClick={() =>
                                    removeAttachment({
                                        requestId: id,
                                        attachmentId: attachment.id,
                                    })
                                }
                                name="clear"
                            />
                        </Inline>
                    </AttachmentsList>
                );
            })}
        </div>
    );
};
