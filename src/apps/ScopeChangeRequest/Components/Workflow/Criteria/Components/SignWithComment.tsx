import { swap } from '@dbeining/react-atom';
import { Button, TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import styled from 'styled-components';
import { useScopeChangeContext } from '../../../../context/useScopeChangeAccessContext';
import { useWorkflowSigning } from './useWorkflowSigning';
import { ActionWithCommentAtom } from './WorkflowCriteria';

interface SignWithCommentProps {
    action: 'Approved' | 'Rejected';
    buttonText: string;
    stepId: string;
    criteriaId: string;
    closeRequest: boolean;
}

export const SignWithComment = ({
    action,
    criteriaId,
    stepId,
    buttonText,
    closeRequest,
}: SignWithCommentProps): JSX.Element => {
    const { request } = useScopeChangeContext();

    const signMutation = useWorkflowSigning({
        criteriaId: criteriaId,
        requestId: request.id,
        stepId: stepId,
    });

    const [comment, setComment] = useState('');
    const close = () => swap(ActionWithCommentAtom, () => null);

    return (
        <>
            <TextField
                placeholder="Add a comment"
                id="SignWithComment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <ButtonsContainer>
                <Button
                    onClick={() =>
                        signMutation({
                            action: action,
                            closeRequest: closeRequest,
                            comment: comment,
                        })
                    }
                >
                    {buttonText}
                </Button>
                <Button variant="outlined" onClick={close}>
                    Cancel
                </Button>
            </ButtonsContainer>
        </>
    );
};

const ButtonsContainer = styled.div`
    gap: 5px;
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;
