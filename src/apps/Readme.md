# Castberg Portal App

A Castberg portal app is mainly build on the Workspace Component.

This component can be configured seperate og with the help of the WorkspaceApi witch provide 
setup functionality for setting up the workspace. 

A workspace  can also be converted to an workspace application.

To configure a workspace one need several configurations. depending on that one would like to achieve.


```TS


    function createWorkspace(configurator: (api: WorkspaceApi)=> WorkspaceConfig): WorkspaceConfigFunction {
        
        return (api?: PortalApi, CustomWorkspace?: React.FC) => {
            const workspaceApi = createWorkspaceApi(api);

            const config = configurator(workspaceApi);
            
            if (CustomWorkspace) {
                return (): JSX.Element => {
                    return <CustomWorkspace {...config}>
                }
            }
            return (): JSX.Element => {
                return <Workspace {...config}>
            }
        }
    } 

```

```TS
        const workspaceConfig = createWorkspace((api)=> {
            api.createWorkSpace<DataType, 'workspaceId'>({
            objectIdentifier: 'id',
        })
        .configureDataSource(dataSource)
        .configureDataCreator(dataCreator)
        .configureTable(tableConfig)
        .configureGarden(gardenConfig)
        .configureStatusItems(statusBarConfig)
        .configureFilter(filterConfig)
        .configurePrefetchQueries(prefetchQueriesOptions);
        } ) 

        // DEv
        const Workspace = workspaceConfig({}, Workspace)
        React.render(Workspace. document.findElementById("root"));

        // Portal
        const Workspace = workspaceConfig(portalApi)
        React.render(Workspace. document.findElementById("root"));
```
