import { Button, TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useScopeChangeContext } from '../../../../context/useScopeChangeAccessContext';
import { useWorkflowSigning } from './useWorkflowSigning';

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

    return (
        <>
            <TextField
                id="SignWithComment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                onClick={() =>
                    signMutation({ action: action, closeRequest: closeRequest, comment: comment })
                }
            >
                {buttonText}
            </Button>
        </>
    );
};
