import { Tabs } from '@equinor/eds-core-react';
import { FilterProvider, FilterView } from '@equinor/filter';
import { useState } from 'react';
import { AppApi } from '../../../../../apps/apps';
import { useDataContext } from '../../Context/DataProvider';
import { useDataViewer } from '../../DataViewerApi/useDataViewer';
import { useConfiguredTabs } from '../../Tabs/tabsConfig';
import { CompletionViewHeader } from '../DataViewerHeader/DataViewerHeader';
import { CompletionViewTabs } from '../DataViewerTabs/DataViewerTabs';
import { DataView } from '../DefaultDataView/DataView';
import { NoDataViewer } from '../NoDataViewer/NoDataViewer';
import { DataViewWrapper } from './DataViewerStyles';

export function DataViewer(props: AppApi): JSX.Element {
    const {
        treeOptions,
        tableOptions,
        gardenOptions,
        timelineOptions,
        analyticsOptions,
        powerBiOptions,
        filterOptions,
        workflowEditorOptions,
    } = useDataViewer();
    const { data } = useDataContext();

    const { tabs, viewIsActive } = useConfiguredTabs(
        treeOptions,
        tableOptions,
        gardenOptions,
        timelineOptions,
        analyticsOptions,
        powerBiOptions,
        workflowEditorOptions
    );
    const [activeTab, setActiveTab] = useState(0);
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
    };

    function handleFilter() {
        setActiveFilter((state) => !state);
    }

    if (!viewIsActive) return <NoDataViewer />;
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
                    <CompletionViewTabs tabs={tabs} activeTab={activeTab} />
                    <DataView />
                </DataViewWrapper>
            </Tabs>
        </FilterProvider>
    );
}
