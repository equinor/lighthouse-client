import { Button, TextField } from '@equinor/eds-core-react-old';
import {
    ButtonContainer,
    CriteriaSignState,
    InputContainer,
    OnSignStepAction,
    WorkflowSigningParams,
} from '@equinor/Workflow';
import { KeyboardEventHandler, useState } from 'react';
import { UseMutateFunction } from 'react-query';
import { resetSigningAtom } from '../Atoms/signingAtom';

type SignWithCommentModalProps = {
    action: CriteriaSignState;
    buttonText: string;
    stepId: string;
    criteriaId: string;
    requestId: string;
    useWorkflowSigning({
        requestId,
        criteriaId,
        stepId,
    }: WorkflowSigningParams): UseMutateFunction<void, unknown, OnSignStepAction, unknown>;
};
export const SignWithCommentModal = ({
    action,
    buttonText,
    stepId,
    criteriaId,
    requestId,
    useWorkflowSigning,
}: SignWithCommentModalProps): JSX.Element => {
    const [comment, setComment] = useState<string>('');

    const signMutation = useWorkflowSigning({
        criteriaId: criteriaId,
        requestId: requestId,
        stepId: stepId,
    });

    const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleOnKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            resetSigningAtom();
            setComment('');
        }
        //Allow shift+enter linebreak
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            signMutation({
                action: action,
                comment: comment,
            });
            resetSigningAtom();
        }
    };

    return (
        <div onKeyDown={handleOnKeyPress} tabIndex={0}>
            <InputContainer>
                <TextField
                    variant="default"
                    id="comment"
                    label="Comment"
                    value={comment}
                    onChange={onCommentChange}
                    multiline
                    autoFocus={true}
                />
            </InputContainer>

            <ButtonContainer>
                <Button
                    variant="contained"
                    onClick={() => {
                        signMutation({
                            action: action,
                            comment: comment,
                        });
                        resetSigningAtom();
                    }}
                >
                    {buttonText} with comment
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        resetSigningAtom();
                        setComment('');
                    }}
                >
                    Close
                </Button>
            </ButtonContainer>
        </div>
    );
};
