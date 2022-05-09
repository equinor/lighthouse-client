import { useAtom } from '@dbeining/react-atom';
import { Button } from '@equinor/eds-core-react';
import { SignWithComment } from './SignWithComment/SignWithComment';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';
import { actionWithCommentAtom, resetSigningAtom } from '../../Atoms/signingAtom';
import { ReassignBar } from '../../ReassignBar/ReassignBar';
import styled from 'styled-components';

export const CriteriaActionOverlay = (): JSX.Element | null => {
    const state = useAtom(actionWithCommentAtom);
    const requestId = useScopeChangeContext(({ request }) => request.id);

    if (!state) {
        return null;
    }
    return (
        <>
            {state.action === 'Reassign' ? (
                <ButtonContainer>
                    <ReassignBar
                        criteriaId={state.criteriaId}
                        requestId={requestId}
                        stepId={state.stepId}
                    />
                    <Button variant="outlined" onClick={resetSigningAtom}>
                        Cancel
                    </Button>
                </ButtonContainer>
            ) : (
                <SignWithComment
                    action={state.action}
                    buttonText={state.buttonText}
                    criteriaId={state.criteriaId}
                    stepId={state.stepId}
                />
            )}
        </>
    );
};

const ButtonContainer = styled.div`
    display: flex;
    gap: 2em;
    width: 100%;
`;
