import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { releaseControlContext } from '../Atoms/releaseControlAtom';
import { releaseControlQueries } from '../queries/queries';
import { ReleaseControl } from '../types/releaseControl';
import { useReleaseControlMutationWatcher } from './useReleaseControlMutationWatcher';


export const useSidesheetEffects = (actions: SidesheetApi, item: ReleaseControl): void => {
    const { baseQuery } = releaseControlQueries;

    useEffect(() => {
        const { updateAtom } = releaseControlContext;
        updateAtom({ releaseControl: item });
    }, [item.id]);

    useReleaseControlMutationWatcher(item.id);

    useQuery({
        ...baseQuery(item.id),
        initialData: item,
        onSuccess: (releaseControl) => {
            const { updateAtom } = releaseControlContext;
            updateAtom({ releaseControl });
        },
    });

    useEffect(() => {
        actions.setTitle(`${item.sequenceNumber} ${item.title}`);
        actions.setWidth(1150);
    }, []);
};
