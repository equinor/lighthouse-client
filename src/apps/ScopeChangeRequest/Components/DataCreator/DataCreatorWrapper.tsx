import styled from 'styled-components';
import { ScopeChangeErrorBanner } from '../ErrorBanner/ErrorBanner';
import { useOctopusErrorHandler } from '../../hooks/observers/useOctopusErrorHandler';
import { ScopeChangeRequestForm } from '../Form/ScopeChangeRequestForm';
import { openSidesheet } from '../../../../packages/Sidesheet/Functions';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect } from 'react';

interface DataCreatorWrapperProps {
    closeScrim: () => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

export const ScopeChangeDataCreator = ({ closeScrim }: DataCreatorWrapperProps): JSX.Element => {
    useEffect(() => {
        closeScrim();
        openSidesheet(ScopeChangeCreateForm, undefined, 'change');
    }, []);

    return <></>;
};

interface ScopeChangeCreateFormProps {
    actions: SidesheetApi;
}

const ScopeChangeCreateForm = ({ actions }: ScopeChangeCreateFormProps) => {
    useOctopusErrorHandler();

    useEffect(() => {
        actions.setTitle('Create new scope change request');
        actions.setWidth(1150);
    }, []);

    return (
        <>
            <ScopeChangeErrorBanner />
            <Wrapper>
                <ScopeChangeRequestForm actions={actions} />
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
