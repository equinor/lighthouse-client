import { Button, CircularProgress } from '@equinor/eds-core-react';
import { PopoutSidesheet } from '@equinor/sidesheet';
import { useNavigate } from 'react-router';
import { WorkspaceProps } from '../..';
import { BookmarkContextWrapper } from '../../Context/BookmarkContext';
import { useDataContext } from '../../Context/DataProvider';
import { WorkspaceFilterWrapper } from '../../Context/WorkspaceFilterWrapper';
import { useConfiguredTabs } from '../../Util/tabsConfig';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { DumpsterFireDialog } from '../DataLoadFailed/DumpsterFireDialog';
import { NoDataView } from '../NoDataViewer/NoData';
import { WorkSpaceTabs } from '../WorkSpaceTabs/WorkSpaceTabs';
import { HeaderWrapper } from './HeaderFilterWrapper';
import { WorkspaceErrorPage } from './WorkspaceErrorPage';
import { DataViewWrapper, Loading, WorkspaceWrapper } from './WorkSpaceViewStyles';

export function WorkSpaceView(props: WorkspaceProps): JSX.Element {
    const workspace = useWorkSpace();
    const { tabs, viewIsActive } = useConfiguredTabs(workspace);
    const { dataApi } = useDataContext();

    const navigate = useNavigate();

    if (!viewIsActive) return <NoDataView />;

    if (dataApi.isError) {
        return (
            <WorkspaceErrorPage>
                <DumpsterFireDialog
                    buttons={[
                        <Button key={1} onClick={() => navigate('/')}>
                            Go to homepage
                        </Button>,
                    ]}
                    text={
                        typeof dataApi.error === 'string' ? dataApi.error : 'Something went wrong'
                    }
                />
            </WorkspaceErrorPage>
        );
    }

    if (dataApi.isLoading) {
        return (
            <Loading>
                <CircularProgress color="primary" value={0} size={48} />
                <h2>Loading {props.title.toLowerCase()}..</h2>
            </Loading>
        );
    }

    return (
        <WorkspaceWrapper>
            <WorkspaceFilterWrapper filterOptions={workspace.filterOptions || []}>
                <BookmarkContextWrapper>
                    <HeaderWrapper props={props} tabs={tabs} />
                    <DataViewWrapper>
                        <WorkSpaceTabs tabs={tabs} />
                        <PopoutSidesheet />
                    </DataViewWrapper>
                </BookmarkContextWrapper>
            </WorkspaceFilterWrapper>
        </WorkspaceWrapper>
    );
}
