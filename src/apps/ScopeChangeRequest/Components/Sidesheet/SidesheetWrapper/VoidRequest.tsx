import { Button, TextField } from '@equinor/eds-core-react-old';
import { Modal } from '@equinor/modal';
import { useState } from 'react';
import styled from 'styled-components';
import { voidRequest } from '../../../api/ScopeChange/Request';
import { useScopeChangeMutation } from '../../../hooks/React-Query/useScopechangeMutation';
import { scopeChangeMutationKeys } from '../../../keys/scopeChangeMutationKeys';
import { Loading } from './Loading';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5em;
    align-items: center;
    gap: 0.5em;
`;

type VoidModalProps = {
    requestId: string;
    closeModal: () => void;
};
const VoidModal = ({ closeModal, requestId }: VoidModalProps): JSX.Element => {
    const [reasonForVoiding, setReasonForVoiding] = useState('');
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReasonForVoiding(e.target.value);
    };
    const { voidKey } = scopeChangeMutationKeys(requestId);
    const { mutate: voidRequestMutation, isLoading } = useScopeChangeMutation(
        requestId,
        voidKey,
        voidRequest,
        {
            onSuccess: () => closeModal(),
        }
    );

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <InputContainer>
                <TextField
                    variant="default"
                    id="reasonForVoiding"
                    label="Reason for voiding this request"
                    value={reasonForVoiding}
                    onChange={handleOnChange}
                    multiline
                />
            </InputContainer>
            <ButtonContainer>
                <Button
                    variant="contained"
                    onClick={() => {
                        voidRequestMutation({ reasonForVoiding, requestId });
                    }}
                    disabled={reasonForVoiding.length === 0}
                >
                    Void
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setReasonForVoiding('');
                        closeModal();
                    }}
                >
                    Cancel
                </Button>
            </ButtonContainer>
        </>
    );
};

type VoidModeProps = {
    requestId: string;
    closeModal: () => void;
};
export const VoidMode = ({ requestId, closeModal }: VoidModeProps): JSX.Element => {
    return (
        <Modal
            title="Voiding request"
            content={<VoidModal requestId={requestId} closeModal={closeModal} />}
        />
    );
};
