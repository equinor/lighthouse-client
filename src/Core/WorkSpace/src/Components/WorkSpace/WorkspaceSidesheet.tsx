import { openSidesheet, PopoutSidesheet, useSideSheet } from '@equinor/sidesheet';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDataContext } from '../../Context/DataProvider';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { Fallback } from '../FallbackSidesheet/Fallback';

export const WorkspaceSidesheet = (): JSX.Element => {
    const { onSelect, objectIdentifier } = useWorkSpace();
    const { data, dataApi } = useDataContext();

    const navigate = useNavigate();

    const findItem = useCallback(
        (id: string): unknown | undefined => {
            return data.find((x) => x[objectIdentifier] === id);
        },
        [data, objectIdentifier]
    );

    const mountSidesheetFromUrl = useCallback(async () => {
        if (!onSelect) return;
        const id = location.hash.split('/')[1];
        if (data) {
            const item = findItem(id);
            if (item) {
                onSelect(item);
                return;
            }
        } else {
            await dataApi.refetch();
            const item = findItem(id);
            if (item) {
                onSelect(item);
                return;
            }
        }
        openSidesheet(Fallback);
    }, [data, findItem, location.hash, onSelect]);

    /**
     * Removes hash from url when closed
     */

    const { props: sidesheetProps, SidesheetComponent } = useSideSheet();
    useEffect(() => {
        if (location.hash.length > 0) return;
        if (!sidesheetProps && !SidesheetComponent) {
            navigate(location.pathname, { replace: true });
        }
    }, [sidesheetProps, SidesheetComponent, location.pathname]);

    /**
     * Store sidesheet state in url
     */
    useEffect(() => {
        if (location.hash.length > 0 && onSelect) {
            mountSidesheetFromUrl();
        }
    }, [location.hash.length, mountSidesheetFromUrl, onSelect]);

    return (
        <>
            <PopoutSidesheet />
        </>
    );
};
