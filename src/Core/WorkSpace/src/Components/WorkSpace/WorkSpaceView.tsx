import { Button, CircularProgress } from '@equinor/eds-core-react';
import { PopoutSidesheet, useSideSheet } from '@equinor/sidesheet';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { GardenApi } from '../../../../../components/ParkView/Models/gardenApi';
import { AuthenticationProvider } from '../../../../../packages/authentication/src';
import { FilterApi } from '../../../../../packages/Filter/Hooks/useFilterApi';
import { TableAPI } from '../../../../../packages/Table/Types';
import { App, AppEnvironment } from '../../../../Client/Types';
import { AppConfig } from '../../../../Client/Types/AppConfig';
import { DataApi, useDataContext } from '../../Context/DataProvider';
import { MasterApi } from '../../Context/MasterApiProvider';
import { WorkspaceProviders } from '../../Context/WorkspaceProviders';
import { useConfiguredTabs } from '../../Util/tabsConfig';
import { WorkSpaceConfig } from '../../WorkSpaceApi/workspaceState';
import { DumpsterFireDialog } from '../DataLoadFailed/DumpsterFireDialog';
import { CompletionViewHeader } from '../DataViewerHeader/Header';
import { NoDataView } from '../NoDataViewer/NoData';
import { WorkSpaceTabs } from '../WorkSpaceTabs/WorkSpaceTabs';
import { WorkspaceErrorPage } from './WorkspaceErrorPage';
import { DataViewWrapper, Loading, WorkspaceWrapper } from './WorkSpaceViewStyles';

export interface WorkspaceEvents {
    onMasterApiReady?: (api: MasterApi) => void;
    //Will fire when filter is ready // re-initialized
    onFilterReady?: (api: FilterApi<unknown>) => void;
    /**
     * Will fire when Table tab is ready, also when you switch tabs and come back to table tab
     */
    onTableTabReady?: (api: TableAPI) => void;
    /**
     * Will fire when Garden tab is ready, also when you switch tabs and come back to table tab
     */
    onGardenTabReady?: (api: GardenApi) => void;
    /**
     * Will fire when Data api is ready
     */
    onDataApiReady?: (api: DataApi) => void;
    //TODO: Add powerbi stuff
}

interface WorkspaceViewProps {
    app?: App | undefined;
    appConfig: AppConfig;
    appEnv?: AppEnvironment | undefined;
    authProvider: AuthenticationProvider;
    color: `#${string}`;
    groupe: string;
    hasSidesheet?: boolean;
    icon?: string | React.FC | undefined;
    isProduction: boolean;
    shortName: string;
    tags: string[];
    title: string;
    uri?: ((isProduction: boolean) => string) | undefined;
    events?: WorkspaceEvents;
    workspaceOptions: WorkSpaceConfig<unknown>;
}

export function WorkSpaceView(props: WorkspaceViewProps): JSX.Element {
    return (
        <WorkspaceProviders options={props.workspaceOptions} events={props.events ?? {}}>
            <WorkspaceDataInitLayer {...props} />
        </WorkspaceProviders>
    );
}

const Wrapper = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
`;

export function WorkspaceDataInitLayer(props: WorkspaceViewProps): JSX.Element {
    const { tabs, viewIsActive } = useConfiguredTabs(props.workspaceOptions);

    const { dataApi } = useDataContext();

    //TODO: Should this be here?
    const { activeWidth, isMinimized } = useSideSheet();

    if (!viewIsActive) return <NoDataView />;

    if (dataApi?.isError) {
        <DataApiErrorHandler error={dataApi.error} />;
    }

    if (dataApi?.isLoading) {
        <DataApiLoadingHandler title={props.title} />;
    }

    return (
        <WorkspaceWrapper>
            {!props.hasSidesheet && (
                <Wrapper>
                    <PopoutSidesheet />
                </Wrapper>
            )}

            <CompletionViewHeader
                {...props}
                tabs={tabs}
                sideSheetWidth={isMinimized ? activeWidth : 0}
            />
            <DataViewWrapper sideSheetWidth={activeWidth}>
                <WorkSpaceTabs tabs={tabs} />
            </DataViewWrapper>
        </WorkspaceWrapper>
    );
}

//TODO: Extract
interface DataApiErrorHandlerProps {
    error: unknown;
}

export function DataApiErrorHandler({ error }: DataApiErrorHandlerProps): JSX.Element {
    const navigate = useNavigate();
    return (
        <WorkspaceErrorPage>
            <DumpsterFireDialog
                buttons={[
                    <Button key={1} onClick={() => navigate('/')}>
                        Go to homepage
                    </Button>,
                ]}
                text={typeof error === 'string' ? error : 'Something went wrong'}
            />
        </WorkspaceErrorPage>
    );
}

interface DataApiLoadingHandlerProps {
    title: string;
}

export function DataApiLoadingHandler({ title }: DataApiLoadingHandlerProps): JSX.Element {
    return (
        <Loading>
            <CircularProgress color="primary" value={0} size={48} />
            <h2>Loading {title.toLowerCase()}..</h2>
        </Loading>
    );
}
