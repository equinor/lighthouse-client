import { Button, TextField } from '@equinor/eds-core-react-old';
import { KeyboardEventHandler } from 'react';
import { ModalButtonContainer, ModalInputContainer } from '../../styles/styles';
import { disconnectCable } from '../Api/disconnectCable';
import { EleNetworkCable, EleNetwork } from '../types/eleNetwork';

type DisconnectModalProps = {
  circuitTagNo: string;
  cableTagNo: string;
  setIsDisconnecting: (isDisconnecting: boolean) => void;
  comment: string;
  setComment: (comment: string) => void;
  updateDiagram: (
    updatedCable: EleNetworkCable | undefined,
    updatedCircuit: EleNetwork | undefined,
    circuitTagNo: string
  ) => void;
};
export const DisconnectModal = ({
  circuitTagNo,
  cableTagNo,
  setIsDisconnecting,
  comment,
  setComment,
  updateDiagram,
}: DisconnectModalProps): JSX.Element => {
  async function disconnect() {
    const updatedCable = await disconnectCable(circuitTagNo, cableTagNo, comment);
    if (updatedCable) {
      updateDiagram(updatedCable, undefined, circuitTagNo ?? '');
    }
    setIsDisconnecting(false);
  }

  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleOnKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsDisconnecting(false);
    }
    //Allow shift+enter linebreak
    if (event.key === 'Enter' && !event.shiftKey && comment !== '') {
      event.preventDefault();
      disconnect();
    }
  };

  return (
    <div onKeyDown={handleOnKeyPress} tabIndex={0}>
      <ModalInputContainer>
        <TextField
          variant="default"
          id="comment"
          label="Comment"
          value={comment}
          onChange={onCommentChange}
          multiline
          autoFocus={true}
          placeholder={'Add a reason for disconnecting this cable'}
        />
      </ModalInputContainer>

      <ModalButtonContainer>
        <Button
          variant="contained"
          onClick={async () => {
            disconnect();
          }}
          disabled={comment === ''}
        >
          Disconnect
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setIsDisconnecting(false);
          }}
        >
          Cancel
        </Button>
      </ModalButtonContainer>
    </div>
  );
};
