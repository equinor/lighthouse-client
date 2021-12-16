import { Tabs } from '@equinor/eds-core-react';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { AppApi } from '../../../../../apps/apps';
import { FilterView } from '../../../../../components/Filter';
import { FilterProvider } from '../../../../../components/Filter/Context/FilterProvider';
import { useDataContext } from '../../Context/DataProvider';
import { useConfiguredTabs } from '../../Tabs/tabsConfig';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { CompletionViewHeader } from '../DataViewerHeader/Header';
import { DataView } from '../DefaultView/DataView';
import { NoDataView } from '../NoDataViewer/NoData';
import { WorkSpaceTabs } from '../WorkSpaceTabs/WorkSpaceTabs';
import { DataViewWrapper } from './WorkSpaceViewStyles';

export function WorkSpaceView(props: AppApi): JSX.Element {
    const {
        treeOptions,
        tableOptions,
        gardenOptions,
        timelineOptions,
        analyticsOptions,
        powerBiOptions,
        filterOptions,
        workflowEditorOptions,
    } = useWorkSpace();
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
        powerBiOptions,
        workflowEditorOptions
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
                    <DataView />
                </DataViewWrapper>
            </Tabs>
        </FilterProvider>
    );
}
