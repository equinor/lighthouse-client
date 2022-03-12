import { Button, Progress } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useSideSheet } from '../../../../packages/Sidesheet/context/sidesheetContext';
import { getCommPkgById } from '../../Api/PCS/getCommPkgById';
import { initiateScopeChange } from '../../Api/ScopeChange/Request';
import { useEagerLoading } from '../../Hooks/React-Query/useEagerLoading';
import { useScopeChangeMutation } from '../../Hooks/React-Query/useScopechangeMutation';
import { proCoSysQueryKeys } from '../../Keys/proCoSysQueryKeys';
import { scopeChangeMutationKeys } from '../../Keys/scopeChangeMutationKeys';
import { CommissioningPackage } from '../../Types/scopeChangeRequest';
import { useScopeChangeContext } from '../Sidesheet/Context/useScopeChangeAccessContext';
import { SplitView } from './Components/RequestDetailView/Double';
import { SingleView } from './Components/RequestDetailView/Single';

export const RequestDetailView = (): JSX.Element => {
    const { width } = useSideSheet();
    const { request } = useScopeChangeContext();

    const { patchKey } = scopeChangeMutationKeys(request.id);

    const keys = proCoSysQueryKeys();
    const keyFunction = (pkg: CommissioningPackage) => keys.commPkg(pkg.procosysNumber);
    const queryFn = async (pkg: CommissioningPackage) => await getCommPkgById(pkg.procosysId);

    useEagerLoading({
        items: request.commissioningPackages,
        key: keyFunction,
        queryFn: queryFn,
        delayedStartTime: 1000,
    });

    const { mutateAsync: initiate, isLoading } = useScopeChangeMutation(
        request.id,
        patchKey,
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
