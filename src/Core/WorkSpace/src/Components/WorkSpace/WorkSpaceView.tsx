import { FilterProvider, FilterView } from '@equinor/filter';
import { openSidesheet, PopoutSidesheet } from '@equinor/sidesheet';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { WorkspaceProps } from '../..';
import { useDataContext } from '../../Context/DataProvider';
import { useConfiguredTabs } from '../../Tabs/tabsConfig';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { CompletionViewHeader } from '../DataViewerHeader/Header';
import { NoDataView } from '../NoDataViewer/NoData';
import { WorkSpaceTabs } from '../WorkSpaceTabs/WorkSpaceTabs';
import { DataViewWrapper, Tabs } from './WorkSpaceViewStyles';
import { Fallback } from '../FallbackSidesheet/Fallback';

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
    const { data } = useDataContext();
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

    useEffect(() => {
        if (location.hash.length > 0 && onSelect) {
            const id = location.hash.split('/')[1];
            if (data) {
                const item = data.find((x) => x[objectIdentifier] === id);
                if (item) {
                    onSelect(item);
                }
            }
            if (idResolver) {
                idResolver(id).then((x) => onSelect(x));
            } else {
                openSidesheet(Fallback);
            }
        }
    }, [location, idResolver, onSelect, data, objectIdentifier]);

    if (!viewIsActive) return <NoDataView />;
    return (
        <FilterProvider initialData={data} options={filterOptions}>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <CompletionViewHeader
                    {...props}
                    tabs={tabs}
                    handleFilter={handleFilter}
                    activeFilter={activeFilter}
                />
                <FilterView isActive={activeFilter} />
                <DataViewWrapper>
                    <WorkSpaceTabs tabs={tabs} activeTab={activeTab} />
                </DataViewWrapper>
            </Tabs>
            <PopoutSidesheet />
        </FilterProvider>
    );
}
