import { SingleSelect, TextField } from '@equinor/eds-core-react';
import { ResolverFunction } from '@equinor/lighthouse-functions';
import { ClientApi } from '@equinor/lighthouse-portal-client';
import { SidesheetComponentManifest, SidesheetWidgetManifest } from '@equinor/lighthouse-widgets';
import { ColDef, Column, GridApi, RowNode } from 'ag-grid-community';
import { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react';
import { useQuery } from 'react-query';
import { GridContext } from '../../Core/WorkSpace/src/Tabs/GridTab';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { getScopeChangeById, patchScopeChange } from './api/ScopeChange/Request';
import { SidesheetWrapper } from './Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';
import { scopeChangeQueries } from './keys/queries';
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
                            const context: GridContext = props.context;
                            props.data.title = props.newValue;
                            updateFieldAsync(
                                { ...props.data, title: props.newValue },
                                context,
                                props.node
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
                {
                    title: 'Phase',
                    valueFormatter: (s) => s.phase,
                    options: {
                        editable: true,
                        cellEditor: PhaseSelector,
                        cellEditorPopup: true,
                        valueSetter: (props) => {
                            const context: GridContext = props.context;
                            props.data.phase = props.newValue;
                            updateFieldAsync(
                                { ...props.data, phase: props.newValue },
                                context,
                                props.node
                            );
                            return true;
                        },
                    },
                },
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
                {
                    title: 'Guesstimate mhrs',
                    valueFormatter: (s) =>
                        s.disciplineGuesstimates.reduce((acc, curr) => acc + curr.guesstimate, 0),
                    options: {
                        aggFunc: 'sum',
                        enableValue: true,
                    },
                },
            ],
        });
}

const updateFieldAsync = async (
    sc: ScopeChangeRequest,
    context: GridContext,
    rowNode: RowNode | null
) => {
    await patchScopeChange({
        ...sc,
        areaCodes: [],
        documentNumbers: [],
        systemIds: [],
        commissioningPackageNumbers: [],
        tagNumbers: [],
        disciplineGuesstimates: [],
        scopeId: sc?.scope?.id,
    });

    context.refetchData();

    const updatedSc = await getScopeChangeById(sc.id);

    rowNode?.setData(updatedSc);
};

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

interface EditorProps {
    value: string;
    rowIndex: number;
    api: GridApi;
    cellStartedEdit: boolean;
    charPress: unknown | null;
    colDef: ColDef;
    column: Column;
    data: unknown;
    node: RowNode;
    stopEditing: () => void;
}

const RawEditor = (props: EditorProps, ref) => {
    const { refInput, setValue, value } = useDefaultAgGridEditorLogic(
        props.value,
        ref,
        props.stopEditing
    );

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
};

const TitleEditor = forwardRef(RawEditor);

const RawPhaseSelector = (props: EditorProps, ref) => {
    const { phaseQuery } = scopeChangeQueries;
    const { data: phases } = useQuery(phaseQuery);

    const { value, setValue, refInput } = useDefaultAgGridEditorLogic(
        props.value,
        ref,
        props.stopEditing
    );

    return (
        <SingleSelect
            label=""
            handleSelectedItemChange={(s) => setValue(s.selectedItem ?? undefined)}
            value={value}
            items={phases ?? []}
            ref={refInput}
        />
    );
};

const PhaseSelector = forwardRef(RawPhaseSelector);

interface DefaultGridEditorLogic<T> {
    value: T | undefined;
    setValue: (newVal: T | undefined) => void;
    refInput: React.MutableRefObject<HTMLDivElement | null>;
}

export function useDefaultAgGridEditorLogic<T = (string | number) | undefined>(
    inValue: T,
    ref,
    stopEditing: () => void
): DefaultGridEditorLogic<T> {
    const [value, setValue] = useState<T | undefined>(inValue);
    const refInput = useRef<HTMLDivElement | null>(null);

    //Press anywhere outside the text input to stop editing
    useOutsideClick(refInput, stopEditing);

    useEffect(() => {
        // focus on the input
        refInput.current && refInput.current.focus();
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
                //Could possibly do access check here
                return false;
            },

            // Gets called once when editing is finished (eg if Enter is pressed).
            // If you return true, then the result of the edit will be ignored.
            isCancelAfterEnd() {
                return false;
            },
        };
    });

    return {
        value: value,
        setValue: (newVal: T | undefined) => setValue(newVal),
        refInput: refInput,
    };
}
