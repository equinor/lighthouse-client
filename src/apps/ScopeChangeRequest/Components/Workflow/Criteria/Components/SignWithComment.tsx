import { Button, TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { useWorkflowSigning } from './useWorkflowSigning';

interface SignWithCommentBarProps {
    action: 'Approved' | 'Rejected';
    stepId: string;
    criteriaId: string;
    closeRequest: boolean;
}

export const SignWithComment = ({
    action,
    criteriaId,
    stepId,
    closeRequest,
}: SignWithCommentBarProps): JSX.Element => {
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
                {action === 'Approved' ? 'Sign' : 'Reject'}
            </Button>
        </>
    );
};
