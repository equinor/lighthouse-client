import { Button, TextField } from '@equinor/eds-core-react';
import { KeyboardEventHandler, useState } from 'react';
import { CriteriaSignState } from '../../../../../../ScopeChangeRequest/types/scopeChangeRequest';
import { useReleaseControlContext, useWorkflowSigning } from '../../../../../hooks';
import { resetSigningAtom } from '../../../Atoms/signingAtom';
import { ButtonContainer, InputContainer } from '../criteria.styles';

type SignWithCommentModalProps = {
    action: CriteriaSignState;
    buttonText: string;
    stepId: string;
    criteriaId: string;
};
export const SignWithCommentModal = ({
    action,
    stepId,
    criteriaId,
}: SignWithCommentModalProps): JSX.Element => {
    const [comment, setComment] = useState<string>('');

    const requestId = useReleaseControlContext(({ releaseControl }) => releaseControl.id);

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
                    Sign with comment
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
