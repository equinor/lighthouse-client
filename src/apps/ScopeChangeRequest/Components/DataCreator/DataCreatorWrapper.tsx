import { useEffect } from 'react';
import styled from 'styled-components';
import { deref } from '@dbeining/react-atom';

import { ScopeChangeErrorBanner } from '../ErrorBanner/ErrorBanner';
import { useOctopusErrorHandler } from '../../hooks/observers/useOctopusErrorHandler';
import { ScopeChangeRequestForm } from '../Form/ScopeChangeRequestForm';
import { FormBanner } from '../Form/FormBanner/FormBanner';
import { SidesheetApi } from '../../../../packages/Sidesheet/Types/SidesheetApi';
import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { SidesheetCoreContext } from '../../../../packages/Sidesheet/context/sidesheetContext';
import { createAtom } from '@equinor/atom';

interface ScopeChangeCreateFormProps {
    actions: SidesheetApi;
}

export const ScopeChangeCreateForm = ({ actions }: ScopeChangeCreateFormProps): JSX.Element => {
    useOctopusErrorHandler();

    useEffect(() => {
        scopeChangeCreateContext.updateAtom(actions);
        actions.setHasUnsavedChanges(true);
        actions.setTitle('Create new scope change request');
        actions.setWidth(1150);

        return () => {
            deref(SidesheetCoreContext).SidesheetComponent !== ScopeChangeCreateForm &&
                scopeChangeFormAtomApi.clearState();
        };
    }, []);

    return (
        <>
            <ScopeChangeErrorBanner />
            <FormBanner />
            <Wrapper>
                <ScopeChangeRequestForm />
            </Wrapper>
        </>
    );
};

const bannerHeight = '76px';
const topBarHeight = '50px';

const Wrapper = styled.div`
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    height: calc(100% - ${topBarHeight} - ${bannerHeight});
    justify-content: space-between;
    overflow: scroll;
`;

export const scopeChangeCreateContext = createAtom<SidesheetApi>({} as SidesheetApi);
