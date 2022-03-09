import { Button, Progress } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useSideSheet } from '../../../../packages/Sidesheet/context/sidesheetContext';
import { initiateScopeChange } from '../../Api/ScopeChange/Request';
import { useScopeChangeMutation } from '../../Hooks/React-Query/useScopechangeMutation';
import { useScopechangeMutationKeyGen } from '../../Hooks/React-Query/useScopechangeMutationKeyGen';
import { useScopeChangeContext } from '../Sidesheet/Context/useScopeChangeAccessContext';
import { SplitView } from './Components/RequestDetailView/Double';
import { SingleView } from './Components/RequestDetailView/Single';

export const RequestDetailView = (): JSX.Element => {
    const { width } = useSideSheet();
    const { request } = useScopeChangeContext();

    const { patchKey } = useScopechangeMutationKeyGen(request.id);
    const { mutateAsync: initiate, isLoading } = useScopeChangeMutation(
        request.id,
        patchKey(),
        initiateScopeChange
    );

    return (
        <>
            {width > 650 ? <SplitView /> : <SingleView />}
            {request.state === 'Draft' && !request.isVoided && (
                <ActionBar>
                    <Button onClick={() => initiate({ request: request })}>
                        {isLoading ? <Progress.Dots color="neutral" /> : 'Submit request'}
                    </Button>
                </ActionBar>
            )}
        </>
    );
};

const ActionBar = styled.div`
    width: 100%;
    height: 30px;
    position: fixed;
    bottom: 0px;
    padding: 2em;
`;
