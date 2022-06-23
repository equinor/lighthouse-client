import { deleteAttachment } from '../../../api/ScopeChange/Request';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { useScopeChangeMutation } from '../../../hooks/React-Query/useScopechangeMutation';
import { scopeChangeMutationKeys } from '../../../keys/scopeChangeMutationKeys';
import { AttachmentVisual } from '../AttachmentVisual';

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
            {attachments.map((attachment) => (
                <AttachmentVisual
                    key={attachment.id}
                    name={attachment.fileName}
                    fileSize={attachment.fileSize}
                    onRemove={() =>
                        removeAttachment({
                            requestId: id,
                            attachmentId: attachment.id,
                        })
                    }
                />
            ))}
        </div>
    );
};
