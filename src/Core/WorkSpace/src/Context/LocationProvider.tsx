import { createAtom } from '@equinor/atom';
import { EventHub } from '@equinor/lighthouse-utils';
import { TableAPI } from '@equinor/Table';
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
import { GardenApi } from '../../../../components/ParkView/Models/gardenApi';
import { SidesheetEvents } from '../../../../packages/Sidesheet/Types/sidesheetEvents';
import { useWorkSpace } from '../WorkSpaceApi/useWorkSpace';
import { WorkspaceTab } from '../WorkSpaceApi/workspaceState';

interface LocationContext {
    activeTab: WorkspaceTab;
    handleSetActiveTab: (activeTab: WorkspaceTab) => void;
}

const Context = createContext({} as LocationContext);

export const LocationProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    const [activeTab, setActiveTab] = useState<WorkspaceTab>('table');
    console.log('Active tab', activeTab);

    const { defaultTab } = useWorkSpace();

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const currentTabId = useMemo(() => id && `/${id}`, [id]);

    const handleSetActiveTab = useCallback(
        (activeTab: WorkspaceTab) => {
            navigate(
                `${location.pathname.replace(currentTabId || '', '')}/${activeTab}${
                    location.hash
                }` + location.search,
                {
                    replace: true,
                }
            );
            setActiveTab(activeTab);
        },
        [currentTabId, location.hash, location.pathname, location.search, navigate]
    );

    useEffect(() => {
        setActiveTab((id as WorkspaceTab) || defaultTab);
    }, [id, defaultTab]);

    /**
     * Add default tab to url if id is undefined
     */
    useEffect(() => {
        if (!id) {
            navigate(`${defaultTab}${location.hash}` + location.search, {
                replace: true,
            });
        }
    }, [defaultTab, id, location.hash, location.search]);

    useEffect(() => {
        const ev = new EventHub();

        const onClose = ev.registerListener(SidesheetEvents.SidesheetClosed, () => {
            const {
                garden,
                table: { getApi: getTableApi },
            } = tabApis.readAtomValue();

            if (typeof getTableApi === 'function') {
                getTableApi()?.setSelectedRowId(() => null);
            }

            if (Object.keys(garden).length === 0) return;
            garden?.mutations?.setSelectedItem(() => null);
        });

        return () => {
            onClose();
        };
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

interface TabApi {
    ['garden']: GardenApi;
    ['table']: {
        getApi: (() => TableAPI) | null;
    };
}

export const tabApis = createAtom<TabApi>({ table: {}, garden: {} } as TabApi);
