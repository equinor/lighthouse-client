import { useAtom } from '@dbeining/react-atom';
import { Button } from '@equinor/eds-core-react';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';
import { ReassignBar } from '../../ReassignBar/ReassignBar';
import styled from 'styled-components';
import { actionWithCommentAtom, resetSigningAtom } from '@equinor/Workflow';

export const CriteriaActionOverlay = (): JSX.Element | null => {
    const state = useAtom(actionWithCommentAtom);
    const requestId = useScopeChangeContext(({ request }) => request.id);

    if (!state) {
        return null;
    }
    return (
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
    );
};

const ButtonContainer = styled.div`
    display: flex;
    gap: 2em;
    width: 100%;
`;
