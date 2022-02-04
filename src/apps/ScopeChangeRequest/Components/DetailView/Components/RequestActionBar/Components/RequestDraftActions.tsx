import { Button, Progress } from '@equinor/eds-core-react';
import { useMutation } from 'react-query';
import { initiateScopeChange } from '../../../../../Api/ScopeChange/initiateScopeChange';
import { useScopeChangeAccessContext } from '../../../../Sidesheet/Context/useScopeChangeAccessContext';
import { ButtonContainer } from './RequestActionBar';
import { VoidRequestButton } from './VoidRequestButton';

export function RequestDraftActions(): JSX.Element {
    const {
        isLoading: initiateLoading,
        error: initiateError,
        mutateAsync: initiate,
    } = useMutation(onInitiate);

    const { requestAccess, request } = useScopeChangeAccessContext();

    async function onInitiate(): Promise<void> {
        await initiateScopeChange(request);
    }

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
                    disabled={!requestAccess.canPatch}
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
