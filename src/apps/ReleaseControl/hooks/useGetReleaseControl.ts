import { useQuery } from 'react-query';
import { updateContext } from '../components/sidesheet/ReleaseControlSidesheet/updateContext';
import { releaseControlQueries } from '../queries/queries';
import { ReleaseControl } from '../types/releaseControl';

export function useGetReleaseControl(id: string, initialData?: ReleaseControl): void {
    const { baseQuery } = releaseControlQueries;
    useQuery({
        ...baseQuery(id),
        initialData: initialData,
        refetchInterval: 600000,
        refetchOnWindowFocus: true,
        cacheTime: 600000,
        onSuccess: (s) => {
            updateContext(s);
        },
    });
}
