import { Button, Progress } from '@equinor/eds-core-react';
import { useMutation } from 'react-query';
import { unVoidRequest, voidRequest } from '../../../../../Api/ScopeChange/voidRequest';
import { useScopeChangeAccessContext } from '../../../../Sidesheet/Context/useScopeChangeAccessContext';

export function VoidRequestButton(): JSX.Element {
    const { request } = useScopeChangeAccessContext();

    const {
        isLoading: voidLoading,
        error: voidError,
        mutateAsync: onVoid,
    } = useMutation(onVoidRequest);

    async function onVoidRequest() {
        if (request.isVoided) {
            await unVoidRequest(request.id);
        } else {
            await voidRequest(request.id);
        }
    }

    return (
        <div>
            {voidError && <div>Something went wrong</div>}
            <Button onClick={() => onVoid()} variant="outlined" color="danger">
                {voidLoading ? (
                    <Progress.Dots color="tertiary" />
                ) : (
                    <span>{request.isVoided ? 'Unvoid request' : 'Void request'}</span>
                )}
            </Button>
        </div>
    );
}
