import { useAtom } from '@dbeining/react-atom';
import { Button } from '@equinor/eds-core-react';
import { actionWithCommentAtom, resetSigningAtom } from '../../Atoms/signingAtom';
import { ReassignBar } from '../../ReassignBar/ReassignBar';
import styled from 'styled-components';
import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';

export const CriteriaActionOverlay = (): JSX.Element | null => {
    const state = useAtom(actionWithCommentAtom);
    const releaseControlId = useReleaseControlContext(({ releaseControl }) => releaseControl.id);

    if (!state) {
        return null;
    }
    return (
        <ButtonContainer>
            <ReassignBar
                criteriaId={state.criteriaId}
                requestId={releaseControlId}
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
