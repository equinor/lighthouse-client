## Global dataView state

The data view state wil consist of a dictionary of `DataViews`.
a `DataVide` is can be created with the `createDataView` function.

A route will be registered and calling the `registerApp` function form provided by the client application.

This function will store the app manifest in the  `globalClientState`


### CreateDataView
This is a factory function for crating a `DataView`. 
 
> Routes are derived form the apps registered in the `globalState`.

> AppLinks are derived form the apps registered in the `globalState`

```TS

type Theme "default" | "darkMode"

interface ClientContext {
    plantId: string;
    projectId: string;
    theme: Theme;
}

interface GlobalState {
    apps: AppManifest[];
    context: ClientContext
}

```


```TS
interface DataViewState {
    dataViews: Record<string, DataView>
}

interface DataView {

}

```



To be able to configure routes and create different `Data Views` by providing a setup function and.

```TS
type AppType = "DataViewer" | "SomeApp" | "CustomApp"

interface App {
    appType: AppType;
    setup?: (appManifest: AppManifest) = void;
    customAppComponent?: React.FC<Partial<AppManifest>>;
}

interface AppManifest {
    title: string;
    shortName: string;
    color: HEXColor;
    groupe: AppGroup | AppGroupe[];
    tags: string[];
    icon?: string | React.FC;
    uri?: string;
    app: App;
}

const ChecklistView: React.FC<Checklist> = (props: Checklist) => {
    return (
        <div>
            // Some Checklist view
        </div>
    )
}

function setup(appManifest) {
    const checklist = createDataView(appManifest);

    // checklist.config({/** Some config*/});

    checklist.registerCustomContentView(ChecklistView);

    checklist.registerDataFetcher(async()=>{
        return await api.get("https://some.equinor.Api/${plant}/checklist");
    }, {/** Some options*/});

    // checklist.registerOfflineDataFetcher(async()=>{
    //     return await indexDb.get("checklist");
    // }, {/** Some options*/});

    checklist.registerDataValidator((): Checklist[] =>{
        // Some type validation code 
    });

    checklist.registerFilterOptions({/** Some filter options here*/});
    checklist.registerTableOptions({/** Some table options here*/});
    checklist.registerTreeOptions({/** Some tree options here*/});
    checklist.registerGanttOptions({/** Some gantt options here*/});
    checklist.registerGardenOptions({/** Some garden options here*/});
    checklist.registerAnalyticsOptions({/** Some garden options here*/});
}

```

## Data viewer options types

To activate a view, the viewers options need to be provided. A view will reserve the  data provided by the `dataFetcher`, 
noting wil be displayed before any configuration is provided.


```TS 

```
