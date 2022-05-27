import { TextField } from '@equinor/eds-core-react';
import { ResolverFunction } from '@equinor/lighthouse-functions';
import { ClientApi } from '@equinor/lighthouse-portal-client';
import { SidesheetComponentManifest, SidesheetWidgetManifest } from '@equinor/lighthouse-widgets';
import { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react';
import { patchScopeChange } from './api/ScopeChange/Request';
import { SidesheetWrapper } from './Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';
import { ScopeChangeRequest } from './types/scopeChangeRequest';
import { dataCreator } from './workspaceConfig/dataCreatorConfig';
import { dataSource, idResolver } from './workspaceConfig/dataOptions';
import { filterConfig } from './workspaceConfig/filter/filterConfig';
import { prefetchQueriesOptions } from './workspaceConfig/prefetchQueryOptions';
import { gardenConfig } from './workspaceConfig/sGarden/gardenConfig';
import { tableConfig } from './workspaceConfig/sTable/tableConfig';
import { WorkflowCompact } from './workspaceConfig/sTable/WorkflowCompact';
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
        .registerPrefetchQueries(prefetchQueriesOptions)
        .registerGridOptions({
            columns: [
                {
                    title: 'Id',
                    valueFormatter: (s) => s.sequenceNumber,
                    onClickOpensSidesheet: true,
                },
                {
                    title: 'Title',
                    valueFormatter: (s) => s.title,
                    onClickOpensSidesheet: false,
                    options: {
                        cellEditor: TitleEditor,
                        editable: true,
                        valueSetter: (props) => {
                            props.newValue;
                            patchScopeChange(
                                {
                                    ...props.data,
                                    title: props.newValue,
                                    areaCodes: [],
                                    documentNumbers: [],
                                    systemIds: [],
                                    commissioningPackageNumbers: [],
                                    tagNumbers: [],
                                },
                                true
                            );
                            return true;
                        },
                    },
                },
                {
                    title: 'Comment',
                    valueFormatter: (s) => (s.hasComments ? 'Yes' : ''),
                    onClickOpensSidesheet: false,
                },
                {
                    title: 'Contr.',
                    valueFormatter: (s) => (s.hasPendingContributions ? 'Yes' : ''),
                    onClickOpensSidesheet: false,
                },
                { title: 'Phase', valueFormatter: (s) => s.phase, onClickOpensSidesheet: false },
                {
                    title: 'Workflow',
                    valueFormatter: (s) => s?.workflowSteps?.length,
                    onClickOpensSidesheet: false,
                    options: {
                        cellRenderer: (props) => {
                            const req: ScopeChangeRequest = props.data;

                            return <WorkflowCompact steps={req?.workflowSteps ?? []} />;
                        },
                    },
                },
                {
                    title: 'Current step',
                    valueFormatter: (s) => s?.currentWorkflowStep?.name ?? '',
                    onClickOpensSidesheet: false,
                },
                {
                    title: 'Status',
                    valueFormatter: (s) => s.workflowStatus,
                    onClickOpensSidesheet: false,
                },
                {
                    title: 'State',
                    valueFormatter: (s) => (s.isVoided ? 'Voided' : s.state),
                    onClickOpensSidesheet: false,
                },
            ],
        });
    // .registerPowerBIOptions({
    //     pages: [
    //         {
    //             pageId: 'ReportSectionb822b2eb4fc97aef255b',
    //             pageTitle: 'Overview',
    //             default: true,
    //         },
    //         {
    //             pageId: 'ReportSection40a8a70e6f82243888ca',
    //             pageTitle: 'History',
    //         },
    //     ],
    //     reportURI: 'pp-scope-change-analytics',
    // });
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

const TitleEditor = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);
    const refInput = useRef(null);

    useEffect(() => {
        // focus on the input
        console.log(props);
        refInput.current.focus();
    }, []);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
        return {
            // the final value to send to the grid, on completion of editing
            getValue() {
                // Send to api!
                return value;
            },

            // Gets called once before editing starts, to give editor a chance to
            // cancel the editing before it even starts.
            isCancelBeforeStart() {
                return false;
            },

            // Gets called once when editing is finished (eg if Enter is pressed).
            // If you return true, then the result of the edit will be ignored.
            isCancelAfterEnd() {
                // our editor will reject any value greater than 1000
                return value > 1000;
            },
        };
    });

    return (
        <TextField
            id="title inline edit"
            type="text"
            ref={refInput}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: '100%' }}
        />
    );
});
