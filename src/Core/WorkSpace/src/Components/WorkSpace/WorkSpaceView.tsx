import { Button, CircularProgress } from '@equinor/eds-core-react';
import { PopoutSidesheet, useSideSheet } from '@equinor/sidesheet';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { WorkspaceProps } from '../..';
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
    const { activeWidth, minWidth, isMinimized } = useSideSheet();

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
            {!props.hasSidesheet && (
                <Wrapper>
                    <PopoutSidesheet />
                </Wrapper>
            )}
            <WorkspaceFilterWrapper filterOptions={workspace.filterOptions || []}>
                <HeaderWrapper
                    props={props}
                    tabs={tabs}
                    sideSheetWidth={isMinimized ? activeWidth : 0}
                />
                <DataViewWrapper sideSheetWidth={activeWidth}>
                    <WorkSpaceTabs tabs={tabs} />
                </DataViewWrapper>
            </WorkspaceFilterWrapper>
        </WorkspaceWrapper>
    );
}

const Wrapper = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
`;
