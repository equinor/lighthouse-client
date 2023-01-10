import { useAtom } from '@dbeining/react-atom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
    disableEditMode,
    sideSheetEditModeAtom,
    toggleEditMode,
} from '../../../Atoms/editModeAtom';
import { useOctopusErrorHandler } from '../../../hooks/observers/useOctopusErrorHandler';
import { useScopeChangeMutationWatcher } from '../../../hooks/observers/useScopeChangeMutationWatcher';
import { useGetScopeChangeRequest } from '../../../hooks/queries/useGetScopeChangeRequest';
import { useScopeChangeAccess } from '../../../hooks/queries/useScopeChangeAccess';
import { useSidesheetEffects } from '../../../hooks/sidesheet/useSidesheetEffects';
import { ScopeChangeRequest } from '../../../types/scopeChangeRequest';
import { ScopeChangeErrorBanner } from '../../ErrorBanner/ErrorBanner';
import { ScopeChangeRequestEditForm } from '../../Form/ScopeChangeRequestEditForm';
import { updateContext } from './Utils/updateContext';

import { SidesheetApi } from '@equinor/sidesheet';
import { getScopeChangeSnapshot } from '../../../hooks/context/useScopeChangeContext';
import { Case, Switch } from '@equinor/JSX-Switch';
import { RevisionForm } from './RevisionForm';
import { ScopeChangeDetailView } from './ScopeChangeDetailView';
import { VoidMode } from './VoidRequest';
interface SidesheetWrapperProps {
    item: ScopeChangeRequest;
    actions: SidesheetApi;
}

export function SidesheetWrapper({ item, actions }: SidesheetWrapperProps): JSX.Element {
    const [revisionMode, setRevisionMode] = useState(false);
    const [voidMode, setVoidMode] = useState(false);
    useScopeChangeMutationWatcher(item.id);
    useOctopusErrorHandler();
    useGetScopeChangeRequest(item.id, item);
    useScopeChangeAccess(item.id);
    useSidesheetEffects(
        actions,
        toggleEditMode,
        item.id,
        () => setRevisionMode(true),
        () => setVoidMode(true)
    );

    const editMode = useAtom(sideSheetEditModeAtom);

    useEffect(() => {
        disableEditMode();
        setRevisionMode(false);
        setVoidMode(false);
        updateContext(item, actions);
    }, [item?.id]);

    if (Object.keys(getScopeChangeSnapshot().request).length < 2) {
        return <></>;
    }
    return (
        <>
            <Wrapper>
                <div>
                    <ScopeChangeErrorBanner clearOnPropChange={item.id} />
                </div>
                <Switch>
                    <Case when={editMode}>
                        <ScopeChangeRequestEditForm />
                    </Case>
                    <Case when={revisionMode}>
                        <RevisionForm cancel={() => setRevisionMode(false)} />
                    </Case>
                    <Case when={true}>
                        <ScopeChangeDetailView />
                    </Case>
                </Switch>
            </Wrapper>
            {voidMode && <VoidMode requestId={item.id} closeModal={() => setVoidMode(false)} />}
        </>
    );
}
const Wrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: scroll;
    height: 100%;

    ::-webkit-scrollbar {
        height: 0.5rem;
        width: 13px;
    }
`;
