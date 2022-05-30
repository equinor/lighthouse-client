import { deref } from '@dbeining/react-atom';
import { createAtom } from '@equinor/atom';
import { getSidesheetContext, SidesheetApi } from '@equinor/sidesheet';
import { useEffect } from 'react';
import styled from 'styled-components';
import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { useOctopusErrorHandler } from '../../hooks/observers/useOctopusErrorHandler';
import { ScopeChangeErrorBanner } from '../ErrorBanner/ErrorBanner';
import { FormBanner } from '../Form/FormBanner/FormBanner';
import { ScopeChangeRequestForm } from '../Form/ScopeChangeRequestForm';



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
            deref(getSidesheetContext()).SidesheetComponent !== ScopeChangeCreateForm &&
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
