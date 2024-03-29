import { CircularProgress } from '@equinor/eds-core-react-old';
import { useIsMounted } from '@equinor/lighthouse-utils';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SidesheetApi } from '../Types/SidesheetApi';

interface SuspenseSidesheetProps {
  item: () => Promise<void>;
  actions: SidesheetApi;
}
export function SuspenseSidesheet({
  item: loadData,
  actions,
}: SuspenseSidesheetProps): JSX.Element {
  const [isError, setIsError] = useState(false);

  const isMounted = useIsMounted();

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        await loadData();
      } catch (e) {
        if (isMounted) {
          setIsError(true);
          actions.setTitle('Failed to load...');
        }
      }
    }
    actions.setTitle('Loading sidesheet...');
    getData();
  }, [loadData]);

  useEffect(() => {
    return () => {
      actions.setTitle('');
    };
  }, []);

  return <Loading>{isError ? <h1>Failed to load sidesheet</h1> : <CircularProgress />}</Loading>;
}

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
