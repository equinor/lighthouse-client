import styled from 'styled-components';
import { ScopeChangeErrorBanner } from '../Sidesheet/ErrorBanner';
import { useOctopusErrorHandler } from '../Sidesheet/useOctopusErrorHandler';
import { ScopeChangeRequestForm } from './ScopeChangeRequestForm';

interface DataCreatorWrapperProps {
    closeScrim: () => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

export const DataCreatorWrapper = ({
    closeScrim,
    setHasUnsavedChanges,
}: DataCreatorWrapperProps): JSX.Element => {
    useOctopusErrorHandler();

    return (
        <Wrapper>
            <ScopeChangeErrorBanner />
            <ScopeChangeRequestForm
                closeScrim={closeScrim}
                setHasUnsavedChanges={setHasUnsavedChanges}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 1100px;
`;
