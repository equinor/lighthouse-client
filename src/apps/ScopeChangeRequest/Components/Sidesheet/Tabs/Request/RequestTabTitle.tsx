import { CircularProgress } from '@equinor/eds-core-react-old';
import styled from 'styled-components';
import { useIsScopeChangeMutatingOrFetching } from '../../../../hooks/observers/useIsScopeChangeMutatingOrFetching';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';

export function RequestTabTitle(): JSX.Element {
    const requestId = useScopeChangeContext((s) => s.request.id);
    const isLoading = useIsScopeChangeMutatingOrFetching(requestId);

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
