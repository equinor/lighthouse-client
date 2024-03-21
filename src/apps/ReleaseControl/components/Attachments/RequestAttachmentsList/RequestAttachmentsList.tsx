import { deleteAttachment } from '../../../api/releaseControl/Request';
import { useReleaseControlContext, useReleaseControlMutation } from '../../../hooks';
import { releaseControlMutationKeys } from '../../../queries/releaseControlMutationKeys';
import { AttachmentVisual } from '../AttachmentVisual';

export const RequestAttachmentsList = (): JSX.Element => {
  const { attachments, id } = useReleaseControlContext((s) => ({
    attachments: s.releaseControl.attachments,
    id: s.releaseControl.id,
  }));

  const { deleteAttachmentKey } = releaseControlMutationKeys(id);
  const { mutate: removeAttachment } = useReleaseControlMutation(
    id,
    deleteAttachmentKey,
    deleteAttachment
  );

  return (
    <div>
      {attachments?.map((attachment) => (
        <AttachmentVisual
          key={attachment.id}
          name={attachment.fileName}
          fileSize={attachment.fileSize}
          onRemove={() =>
            removeAttachment({
              releaseControlId: id,
              attachmentId: attachment.id,
            })
          }
        />
      ))}
    </div>
  );
};
