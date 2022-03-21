import { FilterProvider, FilterView } from '@equinor/filter';
import { openSidesheet, PopoutSidesheet } from '@equinor/sidesheet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { WorkspaceProps } from '../..';
import { useDataContext } from '../../Context/DataProvider';
import { TabsConfigItem, useConfiguredTabs } from '../../Tabs/tabsConfig';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { CompletionViewHeader } from '../DataViewerHeader/Header';
import { NoDataView } from '../NoDataViewer/NoData';
import { WorkSpaceTabs } from '../WorkSpaceTabs/WorkSpaceTabs';
import { DataViewWrapper, Tabs } from './WorkSpaceViewStyles';
import { Fallback } from '../FallbackSidesheet/Fallback';
import { useSideSheet } from '../../../../../packages/Sidesheet/context/sidesheetContext';

export function WorkSpaceView(props: WorkspaceProps): JSX.Element {
    const {
        treeOptions,
        tableOptions,
        gardenOptions,
        timelineOptions,
        analyticsOptions,
        powerBiOptions,
        filterOptions,
        workflowEditorOptions,
        onSelect,
        idResolver,
        objectIdentifier,
    } = useWorkSpace();
    const { data, dataApi } = useDataContext();
    const { id } = useParams();
    const currentId = useMemo(() => id && `/${id}`, [id]);
    const navigate = useNavigate();
    const location = useLocation();

    const { tabs, viewIsActive } = useConfiguredTabs(
        //Dont know why??
        treeOptions as any,
        tableOptions,
        gardenOptions,
        timelineOptions,
        analyticsOptions,
        powerBiOptions,
        workflowEditorOptions
    );
    const [activeTab, setActiveTab] = useState(Number(id) || 0);
    const [activeFilter, setActiveFilter] = useState(false);

    // const filterLocationKey = useMemo(() => `filer-${props.shortName}`, [props.shortName]);
    // const persistOptions: FilterPersistOptions = useMemo(
    //     () => ({
    //         getFilter() {
    //             const filter = storage.getItem<FilterData>(filterLocationKey);
    //             if (typeof filter === 'object') {
    //                 return filter;
    //             }
    //             return;
    //         },
    //         setFilter(filterData: FilterData) {
    //             return storage.setItem(filterLocationKey, filterData);
    //         },
    //     }),
    //     [filterLocationKey]
    // );

    const handleChange = (index: number) => {
        setActiveTab(index);

        navigate(`${location.pathname.replace(currentId || '', '')}/${index}`, { replace: true });
    };

    function handleFilter() {
        setActiveFilter((state) => !state);
    }

    const findItem = useCallback(
        (id: string): unknown | undefined => {
            const item = data.find((x) => x[objectIdentifier] === id);
            if (objectIdentifier in item) {
                return item;
            }
            return undefined;
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
        }
        if (idResolver) {
            const item = await idResolver(id);
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
    }, [data, findItem, idResolver, location.hash, onSelect]);

    /**
     * Removes hash from url when closed
     */

    const { props: sidesheetProps, SidesheetComponent } = useSideSheet();
    useEffect(() => {
        if (!sidesheetProps && !SidesheetComponent) {
            window.history.pushState({}, document.title, location.pathname);
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

    if (!viewIsActive) return <NoDataView />;
    return (
        <FilterProvider initialData={data} options={filterOptions}>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <Temp props={props} tabs={tabs} />
                <DataViewWrapper>
                    <WorkSpaceTabs tabs={tabs} activeTab={activeTab} />
                </DataViewWrapper>
            </Tabs>
            <PopoutSidesheet />
        </FilterProvider>
    );
}

type TempProps = {
    props: WorkspaceProps;
    tabs: TabsConfigItem[];
};
const Temp = ({ tabs, props }: TempProps) => {
    const [activeFilter, setActiveFilter] = useState<boolean>(false);
    function handleFilter() {
        setActiveFilter((state) => !state);
    }
    return (
        <>
            <CompletionViewHeader
                {...props}
                tabs={tabs}
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            />
            <FilterView isActive={activeFilter} />
        </>
    );
};
