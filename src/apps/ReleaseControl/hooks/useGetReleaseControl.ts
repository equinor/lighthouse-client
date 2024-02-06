import { useQuery } from 'react-query';
import { CacheTime } from '../../../packages/Workflow/src';
import { updateContext } from '../components/sidesheet/ReleaseControlSidesheet/updateContext';
import { releaseControlQueries } from '../queries/queries';
import { ReleaseControl } from '../types/releaseControl';

export function useGetReleaseControl(id: string, initialData?: ReleaseControl) {
    const { baseQuery } = releaseControlQueries;
    return useQuery({
        ...baseQuery(id),
        placeholderData: initialData,
        refetchInterval: CacheTime.TenMinutes,
        refetchOnWindowFocus: true,
        cacheTime: CacheTime.TenMinutes,
        onSuccess: (s) => {
            updateContext(s);
        },
    });
}
