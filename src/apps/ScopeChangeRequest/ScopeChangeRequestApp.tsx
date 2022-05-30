import { tokens } from '@equinor/eds-tokens';
import { ResolverFunction } from '@equinor/lighthouse-functions';
import { ClientApi, isProduction } from '@equinor/lighthouse-portal-client';
import { SidesheetComponentManifest, SidesheetWidgetManifest } from '@equinor/lighthouse-widgets';
import styled from 'styled-components';
import { PowerBiOptions } from '../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { SidesheetWrapper } from './Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';
import { ScopeChangeRequest } from './types/scopeChangeRequest';
import { dataCreator } from './workspaceConfig/dataCreatorConfig';
import { dataSource, idResolver } from './workspaceConfig/dataOptions';
import { filterConfig } from './workspaceConfig/filter/filterConfig';
import { prefetchQueriesOptions } from './workspaceConfig/prefetchQueryOptions';
import { gardenConfig } from './workspaceConfig/sGarden/gardenConfig';
import { tableConfig } from './workspaceConfig/sTable/tableConfig';
import { statusBarConfig } from './workspaceConfig/statusBarConfig';

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<ScopeChangeRequest>({
            CustomSidesheet: SidesheetWrapper,
            objectIdentifier: 'id',
        })
        .registerDataSource(dataSource)
        .registerDataCreator(dataCreator)
        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig)
        .registerStatusItems(statusBarConfig)
        .registerFilterOptions(filterConfig)
        .registerIdResolver(idResolver)
        // .registerHelpPage({ Component: ScopeChangeRequestHelpPage })
        .registerSearchOptions([
            { name: 'Id', valueFormatter: ({ sequenceNumber }) => sequenceNumber.toString() },
            { name: 'Title', valueFormatter: ({ title }) => title },
        ])
        .registerPrefetchQueries(prefetchQueriesOptions)
        .registerPowerBIOptions(
            !isProduction()
                ? {
                    pages: [
                        {
                            pageId: 'ReportSectionb822b2eb4fc97aef255b',
                            pageTitle: 'Overview',
                            default: true,
                        },
                        {
                            pageId: 'ReportSection40a8a70e6f82243888ca',
                            pageTitle: 'History',
                        },
                    ],
                    reportURI: 'pp-scope-change-analytics',
                }
                : (undefined as unknown as PowerBiOptions)
        );
}

export const changeSideSheetWidgetManifest: SidesheetWidgetManifest = {
    widgetId: 'change',
    widgetType: 'sidesheet',
    color: '#7B3A96',
    props: {
        resolverId: 'changeResolver',
    },
};

export const changeSideSheetWidgetComponent: SidesheetComponentManifest = {
    widgetId: 'change',
    widgetType: 'sidesheet',
    widget: SidesheetWrapper,
};

export const changeFunction: ResolverFunction = {
    functionId: 'changeResolver',
    function: idResolver.idResolver,
    type: 'idResolver',
};

const ScopeChangeRequestHelpPage = () => {
    return (
        <div style={{ maxWidth: '30%' }}>
            <HelpPageHeader>Scope change request</HelpPageHeader>
            <p></p>
        </div>
    );
};

const HelpPageHeader = styled.h2`
    font-size: 28px;
    font-weight: 500;
    color: ${tokens.colors.text.static_icons__secondary.hex};
`;
