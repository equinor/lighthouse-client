# WorkSpace 

- [] WorkSpace config Module.
- [] Workspace Provider Wrapper.


## Workspace Configuration 


```TS

const appManifest = {
    title: 'Scope change request',
    shortName: 'change',
    color: '#7B3A96',
    groupe: Apps.ProjectControl,
    icon: '',
    app: {
        appType: 'Workspace',
        setup: scopeChangeSetup,
        SidesheetComponent: SidesheetWrapper as any,
    },
    tags: [],
    appEnv: 'prod',
}

const workspaceManifest = {
    title: 'Scope change request',
    workspaceId: string;
    color: '#7B3A96',
    widgets: {}
    functions: {}
}    

export function configure(appApi: WorkspaceApi): void {
    appApi
        .createWorkSpace<ScopeChangeRequest>({
            CustomSidesheet: SidesheetWrapper,
            objectIdentifier: 'id',
        })
        .DataSource(dataSource)
        .DataCreator(dataCreator)
        .TableOptions(tableConfig)
        .GardenOptions(gardenConfig)
        .StatusItems(statusBarConfig)
        .FilterOptions(filterConfig)
        .IdResolver(idResolver)
        .PrefetchQueries(prefetchQueriesOptions);
}

export const changeSideSheetWidgetManifest: SidesheetWidgetManifest = {
    widgetId: 'change',
    widgetType: 'sidesheet',
    color: '#7B3A96',
    props: {
        resolverId: 'changeResolver',
        objectIdentifier: 'id',
    },
};

export const changeSideSheetWidgetComponent: SidesheetComponentManifest = {
    widgetId: 'change',
    widgetType: 'sidesheet',
    widget: SidesheetWrapper,
};

export const changeFunction: ResolverFunction<ScopeChangeRequest> = {
    functionId: 'changeResolver',
    function: idResolver,
    type: 'idResolver',
};

```