# Core Sidesheet setup Readme


## Sidesheet Simple

```Mermaid
sequenceDiagram
    participant C as Client
    participant P as Portal
    participant SM as SidesheetModule
    participant WAPI as WidgetsAPI

    C->>P: Client Enters Portal
    P->>SM: Configure Sidesheet

    note over SM: Adds sidesheet configuration
    SM->>WAPI: Requests all available sidesheet for user
    WAPI->>SM: Return all sidesheet widgets manifests available

    note over C: clients clicks button to produce sidesheet 
    P-->>SM: Requests sidesheet by id
    note over SM: Determine if sidesheet files had been loaded.
    SM-->>WAPI: request sidesheet component by id
    WAPI->>SM: Return sidesheet component

    note over SM: Stores component for later use.
    SM->>P: Mounts Sidesheet 
    P->>C: Displays sidesheet to client
```

## Sidesheet Advanced

```Mermaid
sequenceDiagram
    participant C as Client
    participant P as Portal
    participant SM as SidesheetModule
    participant WAPI as WidgetsAPI

    C->>P: Client Enters Portal
    P->>SM: Configure Sidesheet

    note over SM: Adds sidesheet configuration
    SM->>WAPI: Requests all available sidesheet for user
    WAPI->>SM: Return all sidesheet widgets manifests available

    note over C: clients clicks button to produce sidesheet 
    P-->>SM: Requests sidesheet by id
    note over SM: Determine if sidesheet files had been loaded.
    SM-->>WAPI: Request sidesheet component by id
    WAPI->>SM: Return sidesheet component

    note over SM: Determine or id resolver is needed. 
    SM-->>WAPI: Request resolver function
    WAPI->>SM: Reruns resolver function

    note over SM: Resolves id to require all data needed for displaying sidesheet.

    note over SM: Stores component for later use.

    SM->>P: Mounts Sidesheet with popper data
    P->>C: Displays sidesheet to client
```

## The factory module setup diagram.

```Mermaid
sequenceDiagram
    participant C as Client
    participant P as Portal
    participant FM as FactoryModule
    participant WAPI as WidgetsAPI

    C->>P: Client enters Portal
    
    P-->>FM: Request awaitable factories for user 

    FM-->>WAPI: Requests factory widgets by type "creators"

    WAPI->>FM: Return all factory widgets manifests awaitable
 
    note over FM: Determine manifest with access check functions
    FM-->>WAPI: Request access check functions.

    WAPI->>FM: Return access check function.

    note over FM: Executes access check function.
    
    FM->> P: Returns awaitable factories.  
    P->> C: Display awaitable factories to client.  
```