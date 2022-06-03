# WorkSpace 

- [] WorkSpace config Module.
- [] Workspace Provider Wrapper.


## Workspace Configuration 


```TS

const appManifest = {
    title: 'Workspace',
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
    title: 'Workspace',
    workspaceId: string;
    color: '#7B3A96',
    widgets: {}
    functions: {}
}    

const creator = setupCreator({
    widgetId: 'workspaceCreator',
    title: 'Workspace',
    color: '#7B3A96',
    widget: ScopeChangeCreateForm,
    props: {
        accessCheckFunctionId: 'workspaceCreatorAccess',
        parentApp: 'workspace',
        function: async (): Promise<boolean> => {
            const { scopeChange } = httpClient();
            const check = () =>
                scopeChange.fetch('api/someEndpoint', { method: 'OPTIONS' });
            return await (
                await checkOptionsRequest(check)
            ).canPost;
        },
    },
});

export const creatorManifest = creator('CreatorManifest');
export const creatorComponent = creator('CreatorComponent');
export const creatorAccessFunction = creator('AccessFunctionResult');

const sidesheetCreator = setupWorkspaceSidesheet<WSData, 'workspaceDetail'>({
    id: 'workspaceDetail',
    color: '#7B3A96',
    component: SidesheetWrapper,
    props: {
        objectIdentifier: 'id',
        parentApp: 'workspace',
        function: idResolver,
    },
});

export const sideSheetWidgetManifest = sidesheetCreator('SidesheetManifest');
export const sideSheetWidgetComponent = sidesheetCreator('SidesheetComponentManifest');
export const resolverFunction = sidesheetCreator('ResolverFunction');


export function configure(appApi: WorkspaceApi): void {
    appApi
        .createWorkSpace<WSData>({
            customSidesheetOptions: sidesheetCreator('WorkspaceSideSheet'),,
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

```