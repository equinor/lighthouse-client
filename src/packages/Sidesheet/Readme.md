# SideSheet

## SideSheet-Module

The side sheet module incudes the api for registering side-sheets and configuration for where to load side-sheet from.

```TS
    interface SidesheetManifest {
        sidesheetId: string;
        color: string;
    }
```

```TS
    interface Sidesheet<T> {
        sidesheetId: string;
        color: string;
        component: React.FC<T>
        actions: 
    }
```

```TS
initializeClientModules(async (continuator) => {
    continuator.sideSheet.configure({
        
        // fusion ready
        sideSheetManifestProviderUri: "// some endpoint", 
        sideSheetProviderUri: "// some endpoint", 

        //Internal 
        manifestProvider: () => {
            return sideManifests:
        },

        sideSheetProvider: () => {
            return currentSideSheet;
        },
        
        coreSideSheets: [
            {
                sideSheetId: "",
                color: #230055,
                component: Notifications
            }
        ]
    }), 
})

```




## SideSheet-React


- name
- item of type  Partial<T> 
- component
- actions


The client/portal application will 







```Mermaid
sequenceDiagram
    participant Client;
    participant SideSheetLoader;
    Client->>SideSheetLoader: calls with sidesheetId;

```