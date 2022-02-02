import { Button, Progress } from '@equinor/eds-core-react';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { initiateScopeChange } from '../../../../../Api/ScopeChange/initiateScopeChange';
import { ScopeChangeAccessContext } from '../../../../Sidesheet/Context/scopeChangeAccessContext';
import { ButtonContainer } from './RequestActionBar';
import { VoidRequestButton } from './VoidRequestButton';

export function RequestDraftActions(): JSX.Element {
    const {
        isLoading: initiateLoading,
        error: initiateError,
        mutateAsync: initiate,
    } = useMutation(onInitiate);

    const { requestAccess, request, performingAction, setPerformingAction } =
        React.useContext(ScopeChangeAccessContext);

    async function onInitiate(): Promise<void> {
        await initiateScopeChange(request);
    }

    useEffect(() => {
        setPerformingAction(initiateLoading);
    }, [initiateLoading, setPerformingAction]);

    return (
        <div>
            <ButtonContainer>
                <div>
                    <VoidRequestButton />
                </div>
                {initiateError && <div>Something went wrong</div>}
                <Button
                    onClick={() => initiate()}
                    variant="outlined"
                    disabled={performingAction || !requestAccess.canPatch}
                >
                    {initiateLoading ? (
                        <Progress.Dots color="primary" />
                    ) : (
                        <span>Initiate request</span>
                    )}
                </Button>
            </ButtonContainer>
        </div>
    );
}
