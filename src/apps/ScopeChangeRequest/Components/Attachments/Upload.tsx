import { Icon } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import { useCallback, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import styled from 'styled-components';
import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { Attachments } from './Attachments';

export const MAX_SIZE_IN_BYTES = 100 * 1000 ** 2;
export const Upload = (): JSX.Element => {
  const { useAtomState } = scopeChangeFormAtomApi;

  const attachments = useAtomState(({ newAttachments }) => newAttachments ?? []);

  const handleAttachmentsChanged = useCallback(
    (attachments: File[]) => scopeChangeFormAtomApi.updateAtom({ newAttachments: attachments }),
    []
  );

  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const addFiles = useCallback(
    async (files: File[]) => handleAttachmentsChanged([...attachments, ...files]),
    [attachments, handleAttachmentsChanged]
  );

  const removeAttachment = async (attachmentName: string | undefined) => {
    if (!attachmentName) return;
    handleAttachmentsChanged(attachments.filter((x) => x.name !== attachmentName));
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setRejectedFiles(fileRejections);
      addFiles(acceptedFiles);
    },
    [addFiles]
  );

  return (
    <Wrapper>
      <Attachments onDrop={onDrop} maxSizeInBytes={MAX_SIZE_IN_BYTES} />
      {attachments.map((attachment, i) => {
        return (
          <AttachmentsList key={i}>
            <a
              href={URL.createObjectURL(attachment)}
              download
              style={{
                color: `${tokens.colors.interactive.primary__resting.rgba}`,
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              {attachment.name}
            </a>
            <Inline>
              <div>
                {attachment.size && (attachment?.size / 1000 ** 2).toFixed(2)}MB /
                {MAX_SIZE_IN_BYTES / 1000 ** 2}MB
              </div>
              <Icon
                style={{ margin: '0em 0.5em' }}
                color={tokens.colors.interactive.primary__resting.rgba}
                onClick={() => removeAttachment(attachment.name)}
                name="clear"
              />
            </Inline>
          </AttachmentsList>
        );
      })}
      {rejectedFiles && rejectedFiles.length > 0 && (
        <div style={{ color: 'red' }}>
          The following files could not be added
          {rejectedFiles.map((x) => {
            return <div key={x.file.name}>{`${x.file.name} - Reason:  ${x.errors[0].code}`}</div>;
          })}
        </div>
      )}
    </Wrapper>
  );
};

const Inline = styled.span`
  display: flex;
  align-items: center;
`;

const AttachmentsList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5em 0em;
  font-size: 16px;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
`;
