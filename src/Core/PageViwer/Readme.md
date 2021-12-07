# Page Viewer 

In lack of a better name this is for ne called the page viewer. Its main purpose is to provide a means to create tabs.

- [ ] Create tabs by type 
  - [ ] PowerBi
  - [ ] Dashboard
  - [ ] Custom


```TS

    const PageViewerState = {
        route1: {
            page1: {
                type: "PowerBi"
                someOption: {...}
                someOption: {...}
                someOption: {...}
                someOption: {...}
                someOption: {...}
            }
            page2: {
                type: "FusionPowerBi"
                filter: {...}
                someOption: {...}
                someOption: {...}
                someOption: {...}
            }
            page3: {
                type: "Custom"
                component: () => <div> Hello World!</div>
            }
        }
    }


    export function setup(api: AppApi) => {
        const somePageCollection = createPageViewer({... some options})
        somePageCollection.registerPowerBi()
        somePageCollection.registerFusionPowerBi()
        somePageCollection.registerFusionPowerBi()
        somePageCollection.registerFusionPowerBi()
        somePageCollection.registerFusionPowerBi()
        somePageCollection.registerPowerBi()
        somePageCollection.registerDashboard()
        somePageCollection.registerCustom()
    };

```