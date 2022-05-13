import { useEffect } from 'react';
import styled from 'styled-components';
import { SidesheetApi } from '@equinor/sidesheet';

import { ScopeChangeErrorBanner } from '../ErrorBanner/ErrorBanner';
import { useOctopusErrorHandler } from '../../hooks/observers/useOctopusErrorHandler';
import { ScopeChangeRequestForm } from '../Form/ScopeChangeRequestForm';
import { createAtom } from '../../../../Core/Atom/functions/createAtom';
import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { FormBanner } from '../Form/FormBanner/FormBanner';

interface ScopeChangeCreateFormProps {
    actions: SidesheetApi;
}

export const ScopeChangeCreateForm = ({ actions }: ScopeChangeCreateFormProps): JSX.Element => {
    useOctopusErrorHandler();

    useEffect(() => {
        scopeChangeCreateContext.updateAtom(actions);
        scopeChangeFormAtomApi.clearState();
        actions.setTitle('Create new scope change request');
        actions.setWidth(1150);
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

const Wrapper = styled.div`
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 50px);
    justify-content: space-between;
`;

export const scopeChangeCreateContext = createAtom<SidesheetApi>({} as SidesheetApi);
