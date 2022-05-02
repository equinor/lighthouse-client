import { swap } from '@dbeining/react-atom';
import { Button, TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useScopeChangeContext } from '../../../../../hooks/context/useScopeChangeContext';
import { useWorkflowSigning } from '../../../../../hooks/mutations/useWorkflowSigning';
import { CriteriaSignState } from '../../../../../types/scopeChangeRequest';
import { actionWithCommentAtom as actionWithCommentAtom } from '../WorkflowCriteria/WorkflowCriteria';
import { ButtonsContainer } from './signWithComment.styles';

interface SignWithCommentProps {
    action: CriteriaSignState;
    buttonText: string;
    stepId: string;
    criteriaId: string;
}

export const SignWithComment = ({
    action,
    criteriaId,
    stepId,
    buttonText,
}: SignWithCommentProps): JSX.Element => {
    const requestId = useScopeChangeContext(({ request }) => request.id);

    const signMutation = useWorkflowSigning({
        criteriaId: criteriaId,
        requestId: requestId,
        stepId: stepId,
    });

    const [comment, setComment] = useState('');
    const close = () => swap(actionWithCommentAtom, () => null);

    return (
        <>
            <TextField
                placeholder="Add a comment"
                id="SignWithComment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                    const enter = e.keyCode === 13;
                    if (enter) {
                        e.preventDefault();
                        // signMutation({
                        //     action: action,
                        //     comment: comment,
                        // });
                        return false;
                    }
                }}
            />
            <ButtonsContainer>
                <Button
                    onClick={() =>
                        signMutation({
                            action: action,
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
