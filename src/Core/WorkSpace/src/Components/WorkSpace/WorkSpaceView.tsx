import { CircularProgress } from '@equinor/eds-core-react';
import { PopoutSidesheet } from '@equinor/sidesheet';
import { WorkspaceProps } from '../..';
import { useDataContext } from '../../Context/DataProvider';
import { LocationProvider } from '../../Context/LocationProvider';
import { useConfiguredTabs } from '../../Tabs/tabsConfig';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { NoDataView } from '../NoDataViewer/NoData';
import { WorkSpaceTabs } from '../WorkSpaceTabs/WorkSpaceTabs';
import { HeaderWrapper } from './HeaderFilterWrapper';
import { WorkspaceFilterWrapper } from './WorkspaceFilterWrapper';
import { DataViewWrapper, Loading, WorkspaceWrapper } from './WorkSpaceViewStyles';

export function WorkSpaceView(props: WorkspaceProps): JSX.Element {
    const {
        treeOptions,
        tableOptions,
        gardenOptions,
        timelineOptions,
        analyticsOptions,
        filterOptions = [],
        workflowEditorOptions,
        powerBiOptions,
    } = useWorkSpace();

    const { tabs, viewIsActive } = useConfiguredTabs(
        //Dont know why??
        treeOptions as any,
        tableOptions,
        gardenOptions,
        timelineOptions,
        analyticsOptions,
        workflowEditorOptions,
        powerBiOptions
    );
    const { data } = useDataContext();

    if (!viewIsActive) return <NoDataView />;

    if (!data || data.length === 0) {
        return (
            <Loading>
                <CircularProgress size={48} />
                <div>Loading {props.shortName}</div>
            </Loading>
        );
    }
    return (
        <WorkspaceWrapper>
            <LocationProvider>
                <WorkspaceFilterWrapper filterConfiguration={filterOptions}>
                    <HeaderWrapper props={props} tabs={tabs} />
                    <DataViewWrapper>
                        <WorkSpaceTabs title={props.title} tabs={tabs} />
                        <PopoutSidesheet />
                    </DataViewWrapper>
                </WorkspaceFilterWrapper>
            </LocationProvider>
        </WorkspaceWrapper>
    );
}
