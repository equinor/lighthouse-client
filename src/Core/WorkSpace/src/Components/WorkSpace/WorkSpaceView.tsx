import { Button, CircularProgress } from '@equinor/eds-core-react';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { WorkspaceProps } from '../..';
import { useDataContext } from '../../Context/DataProvider';
import { useConfiguredTabs } from '../../Tabs/tabsConfig';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { DumpsterFireDialog } from '../DataLoadFailed/DumpsterFireDialog';
import { NoDataView } from '../NoDataViewer/NoData';
import { WorkSpaceTabs } from '../WorkSpaceTabs/WorkSpaceTabs';
import { HeaderWrapper } from './HeaderFilterWrapper';
import { WorkspaceErrorPage } from './WorkspaceErrorPage';
import { WorkspaceFilterWrapper } from './WorkspaceFilterWrapper';
import { WorkspaceSidesheet } from './WorkspaceSidesheet';
import { DataViewWrapper, Tabs, WorkspaceWrapper } from './WorkSpaceViewStyles';

export function WorkSpaceView(props: WorkspaceProps): JSX.Element {
    const {
        treeOptions,
        tableOptions,
        gardenOptions,
        timelineOptions,
        analyticsOptions,
        powerBiOptions,
        filterOptions = [],
        workflowEditorOptions,
        defaultTab,
    } = useWorkSpace();

    const { dataApi } = useDataContext();
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

    const [activeTab, setActiveTab] = useState(Number(id) || defaultTab);

    const handleChange = (index: number) => {
        setActiveTab(index);

        navigate(`${location.pathname.replace(currentId || '', '')}/${index}`, { replace: true });
    };

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
            <WorkspaceFilterWrapper filterConfiguration={filterOptions}>
                <Tabs activeTab={activeTab} onChange={handleChange}>
                    <HeaderWrapper props={props} tabs={tabs} />
                    <DataViewWrapper>
                        <WorkSpaceTabs title={props.title} tabs={tabs} activeTab={activeTab} />
                        <WorkspaceSidesheet />
                    </DataViewWrapper>
                </Tabs>
            </WorkspaceFilterWrapper>
        </WorkspaceWrapper>
    );
}

const Loading = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5em;
`;
