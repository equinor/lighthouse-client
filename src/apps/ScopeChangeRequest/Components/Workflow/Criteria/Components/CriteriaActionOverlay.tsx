import { swap, useAtom } from '@dbeining/react-atom';
import { Button } from '@equinor/eds-core-react';
import { SignWithComment } from './SignWithComment/SignWithComment';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';
import { actionWithCommentAtom } from '../../Atoms/signingAtom';
import { ReassignBar } from '../../ReassignBar/ReassignBar';

export const CriteriaActionOverlay = (): JSX.Element | null => {
    const state = useAtom(actionWithCommentAtom);
    const requestId = useScopeChangeContext(({ request }) => request.id);

    if (!state) {
        return null;
    }
    return (
        <>
            {state.action === 'Approved' ||
                state.action === 'Rejected' ||
                state.action === 'Disputed' ? (
                <SignWithComment
                    action={state.action}
                    buttonText={state.buttonText}
                    criteriaId={state.criteriaId}
                    stepId={state.stepId}
                />
            ) : (
                <div style={{ display: 'flex', gap: '2em', width: '100%' }}>
                    <ReassignBar
                        criteriaId={state.criteriaId}
                        requestId={requestId}
                        stepId={state.stepId}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => swap(actionWithCommentAtom, () => null)}
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </>
    );
};
