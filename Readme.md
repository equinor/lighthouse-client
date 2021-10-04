# ProCoSys - Project Lighthouse

## ProCoSys - Client

-   Should the app shell be present at all times?
-   Dynamic loading of modules?

[Module federation](https://webpack.js.org/concepts/module-federation/) - Each build acts as a container and also consumes other builds as containers. This way each build is able to access any other exposed module by loading it from its container. [Read More.](https://blog.bredvid.no/micro-frontends-with-module-federation-e4ed75fcc328)

## Development

-   How many module will be developed at the same time?
-   Should modules be allowed to talk to each other?
-   Should there be tab to tab communication?
-   Data persistance? (NO Offline)

-   Should new proCoSys be developed as Progressive Web Apps (PDW)
    -   Service Worker strategy.
    -   Reloading strategy
-   Will we need to rely on old modules form proCoSys?
-   Front-door for CDN.
-   Micro Fronted?

## Technologies

### Persistance

-   Local Storage
-   Session Storage
-   indexDB

### Features that may occur:

-   Split View
-
