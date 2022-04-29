import { openSidesheet } from '@equinor/sidesheet';
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSideSheet } from '../../../../packages/Sidesheet/context/sidesheetContext';
import { Fallback } from '../Components/FallbackSidesheet/Fallback';
import { useWorkSpace } from '../WorkSpaceApi/useWorkSpace';
import { WorkspaceTab } from '../WorkSpaceApi/workspaceState';
import { useDataContext } from './DataProvider';

interface LocationContext {
    activeTab: WorkspaceTab;
    handleSetActiveTab: (activeTab: WorkspaceTab) => void;
}

const Context = createContext({} as LocationContext);

export const LocationProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    const { id } = useParams();
    const { data, dataApi } = useDataContext();
    const { defaultTab, onSelect, idResolver, objectIdentifier } = useWorkSpace();

    const currentTabId = useMemo(() => id && `/${id}`, [id]);

    const [activeTab, setActiveTab] = useState<WorkspaceTab>(
        (id as WorkspaceTab) || defaultTab || 'table'
    );

    const navigate = useNavigate();
    const location = useLocation();

    const handleSetActiveTab = useCallback(
        (activeTab: WorkspaceTab) => {
            navigate(
                `${location.pathname.replace(currentTabId || '', '')}/${activeTab}${location.hash}`,
                {
                    replace: true,
                }
            );
            setActiveTab(activeTab);
        },
        [currentTabId, location, navigate]
    );

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
            if (item !== undefined) {
                onSelect(item);
                return;
            }
        }
        if (idResolver) {
            try {
                const item = await idResolver(id);
                console.log(item);
                if (item !== undefined) {
                    onSelect(item);
                    return;
                }
            } catch (e) {
                openSidesheet(Fallback);
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
    }, [data, findItem, idResolver, location.hash, onSelect]);

    /**
     * Add default tab to url if id is undefined
     */
    useEffect(() => {
        if (!id) {
            navigate(`${location.pathname}/${defaultTab}${location.hash}`, {
                replace: true,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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
        if (sidesheetProps || SidesheetComponent) return;
        if (location.hash.length > 0 && onSelect) {
            mountSidesheetFromUrl();
        }
    }, []);

    return (
        <Context.Provider
            value={{
                activeTab,
                handleSetActiveTab,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export function useLocationContext(): LocationContext {
    return useContext(Context);
}
