import { CircularProgress } from '@equinor/eds-core-react-old';
import { useIsFetching } from 'react-query';
import styled from 'styled-components';
import { scopeChangeQueries } from '../../../../keys/queries';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';

export function LogTabTitle(): JSX.Element {
  const requestId = useScopeChangeContext((s) => s.request.id);
  const isLoading =
    useIsFetching(scopeChangeQueries.historyQuery(requestId).queryKey, { active: true }) > 0;

  return (
    <TabTitle>
      Log
      {isLoading && <CircularProgress size={16} />}
    </TabTitle>
  );
}
const TabTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;
