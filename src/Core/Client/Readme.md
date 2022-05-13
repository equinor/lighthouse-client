# The Client 

The main hart of the project portal.


## The Client

By providing appManifests and appGroups the `createClient` function will
orchestrate creation of the client

```TS

    interface ClientOptions{
        getApps(): => void;
        getAppGroups(): => void;
    }

    /*Project Portal Setup*/
    createClient({ getApps, getAppGroups }).then((client) => {
        if (client.authProvider && !(window !== window.parent && !window.opener)) {
            render(<Client {...client} />, document.getElementById('root'));
        }
    });
    
```
### Global State Context 



## Global HttpClient

Basic usage of the `httpClient` function. providing scoped http clients.

```TS
import {httpClient} from "@equinor/lighthouse-portal-client"

export async function getTags() {
    const { STID } = httpClient();
    return await STID.get("/tags").then(result => result.json());
}

```

Usage with custom scope and baseUrl.

```TS
import {httpClient} from "@equinor/lighthouse-portal-client"

export async function getTags() {
    const { customClient } = httpClient({scope: "api://12345-scope-1234", baseUrl:"https://someBaseUrl.ai"});
    return await customClient.get("/someThing").then(result => await result.json());
}

```

Example of changing the base url on a internal httpClient for testing purpose.
Should only be done under development and not shipped to production.


```TS
import {httpClient} from "@equinor/lighthouse-portal-client"

export async function getScopes() {
    const { scopeChange } = httpClient();
    scopeChange.addBaseUrl("https://someOtherScopeChangeBaseUrl.ai")
    return await customClient.get("/scopes").then(result => await result.json());
}

```

The httpClient will also provide a `logOptions` function for debug purpose, login the current options of the selected httpClient.
`addScope` function enables you to change the scope of the httpClient. This basicity creates a new client with the current scope 


```TS
    
    const { scopeChange } = httpClient();
    scopeChange.logOptions();

```


