import { useQuery } from 'react-query';

import { scopeChangeQueries } from '../../../../keys/queries';
import { HistoryItem } from '../../../DetailView/History/HistoryItem';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';

export function LogTab(): JSX.Element {
    const requestId = useScopeChangeContext((s) => s.request.id);

    const { historyQuery } = scopeChangeQueries;

    const { data } = useQuery(historyQuery(requestId));

    return (
        <div>
            {data &&
                data.map((x) => {
                    return <HistoryItem key={x.id} item={x} />;
                })}
        </div>
    );
}
