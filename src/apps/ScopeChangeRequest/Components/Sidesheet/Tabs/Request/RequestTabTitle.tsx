import { CircularProgress } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useIsScopeChangeMutatingOrFetching } from '../../../../hooks/observers/useIsScopeChangeMutatingOrFetching';
import { useScopeChangeContext } from '../../../../context/useScopeChangeAccessContext';

export function RequestTabTitle(): JSX.Element {
    const { request } = useScopeChangeContext();
    const isLoading = useIsScopeChangeMutatingOrFetching(request.id);

    return (
        <TabTitle>
            Request
            {isLoading && <CircularProgress size={16} />}
        </TabTitle>
    );
}
const TabTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5em;
`;
