import { Button, TextField } from '@equinor/eds-core-react';
import { KeyboardEventHandler } from 'react';
import { ModalButtonContainer, ModalInputContainer } from '../../styles/styles';
import { isolateCircuit } from '../Api/isolateCircuit';
import { EleNetwork, EleNetworkCable } from '../types/eleNetwork';

type IsolateModalProps = {
    circuitAndStarterTagNo: string;
    setIsIsolating: (isIsolating: boolean) => void;
    comment: string;
    setComment: (comment: string) => void;
    updateDiagram: (
        updatedCable: EleNetworkCable | undefined,
        updatedCircuit: EleNetwork | undefined,
        circuitTagNo: string
    ) => void;
};
export const IsolateModal = ({
    circuitAndStarterTagNo,
    setIsIsolating,
    comment,
    setComment,
    updateDiagram,
}: IsolateModalProps): JSX.Element => {
    async function isolate() {
        const updatedCircuit = await isolateCircuit(circuitAndStarterTagNo, comment);
        if (updatedCircuit) {
            updateDiagram(undefined, updatedCircuit, circuitAndStarterTagNo ?? '');
        }
        setIsIsolating(false);
    }
    const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleOnKeyPress: KeyboardEventHandler<HTMLDivElement> = async (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            isolate();
        }
        //Allow shift+enter linebreak
        if (event.key === 'Enter' && !event.shiftKey && comment !== '') {
            event.preventDefault();
            const updatedCircuit = await isolateCircuit(circuitAndStarterTagNo, comment);
            if (updatedCircuit) {
                updateDiagram(undefined, updatedCircuit, circuitAndStarterTagNo ?? '');
            }
            setIsIsolating(false);
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
                    placeholder={'Add a reason for isolating this circuit'}
                />
            </ModalInputContainer>

            <ModalButtonContainer>
                <Button
                    variant="contained"
                    onClick={() => {
                        isolate();
                    }}
                    disabled={comment === ''}
                >
                    Isolate
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setIsIsolating(false);
                    }}
                >
                    Cancel
                </Button>
            </ModalButtonContainer>
        </div>
    );
};
