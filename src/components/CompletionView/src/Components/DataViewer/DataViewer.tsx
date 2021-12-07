import { Tabs } from '@equinor/eds-core-react';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { AppApi } from '../../../../../apps/apps';
import { FilterView } from '../../../../Filter';
import { FilterProvider } from '../../../../Filter/Context/FilterProvider';
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
    } = useDataViewer();
    const { data } = useDataContext();
    const { id } = useParams();
    const currentId = useMemo(() => id && `/${id}`, [id]);
    const navigate = useNavigate();
    const location = useLocation();

    const { tabs, viewIsActive } = useConfiguredTabs(
        treeOptions,
        tableOptions,
        gardenOptions,
        timelineOptions,
        analyticsOptions,
        powerBiOptions
    );
    const [activeTab, setActiveTab] = useState(Number(id) || 0);
    const [activeFilter, setActiveFilter] = useState(false);

    const handleChange = (index: number) => {
        setActiveTab(index);

        navigate(`${location.pathname.replace(currentId || '', '')}/${index}`, { replace: true });
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
