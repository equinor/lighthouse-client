import { useEffect, useMemo, useRef, useState } from 'react';

import { Subscription } from 'rxjs';

import { useFramework } from '@equinor/fusion-framework-react';

import { useObservableState } from '@equinor/fusion-observable/react';

import { AppManifestError } from '@equinor/fusion-framework-module-app/errors.js';

import { ErrorViewer } from './ErrorViewer';
import { AppModule } from '@equinor/fusion-framework-module-app';
import EquinorLoader from './EquinorLoader';
import { useQuery } from 'react-query';
import { httpClient } from '../Core/Client/Functions';

/**
 * React Functional Component for handling current application
 *
 * this component will set the current app by provided appKey.
 * when the appKey changes, this component will try to initialize the referred application
 * and render it.
 */
export const AppLoader = (props: { readonly appKey: string }) => {
    const { appKey } = props;
    const fusionClient = httpClient().fusion;
    const fusion = useFramework<[AppModule]>();
    const { data: config, isLoading: configLoading } = useQuery(
        [appKey, 'config'],
        async ({ signal }) => {
            return (await fusionClient.fetch(`api/apps/${appKey}/config`, { signal })).json();
        }
    );

    const { data: manifest, isLoading: manifestLoading } = useQuery(
        [appKey, 'manifest'],
        async ({ signal }) => {
            return (await fusionClient.fetch(`api/apps/${appKey}`, { signal })).json();
        }
    );

    const { data: bundle, isLoading: bundleLoading } = useQuery(
        [appKey, 'bundle'],
        async ({ signal }) => {
            return (await fusionClient.fetch(`bundles/apps/${appKey}.js`, { signal })).blob();
        }
    );

    const isLoading = manifestLoading || configLoading || bundleLoading;

    //https://fusion-s-portal-ci.azurewebsites.net/bundles/apps/
    /** reference of application section/container */
    const ref = useRef<HTMLElement>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | undefined>();

    // TODO change to `useCurrentApp`
    /** observe and use the current selected application from framework */
    const { value: currentApp } = useObservableState(
        useMemo(() => fusion.modules.app.current$, [fusion.modules.app])
    );

    useEffect(() => {
        /** when appKey property change, assign it to current */
        fusion.modules.app.setCurrentApp(appKey);
    }, [appKey, fusion]);

    useEffect(() => {
        /** flag that application is loading */
        setLoading(true);

        /** clear previous errors */
        setError(undefined);

        /** create a teardown of load */
        const subscription = new Subscription();

        /** make sure that initialize is canceled and disposed if current app changes  */

        if (config && manifest && bundle) {
            const el = document.createElement('div');
            el.style.display = 'contents';
            el.style.height = '100%';
            if (!ref.current) {
                throw Error('Missing application mounting point');
            }

            ref.current.appendChild(el);

            const url = URL.createObjectURL(bundle);

            import(url).then((script) => {
                const render = script.renderApp ?? script.default;

                /** add application teardown to current render effect teardown */
                subscription.add(
                    render(el, { fusion, env: { basename: 'localhost:3000', config, manifest } })
                );
                setLoading(false);
            });

            URL.revokeObjectURL(url);
            /** extract render callback function from javascript module */

            /** remove app element when application unmounts */
            subscription.add(() => el.remove());
        }

        /** teardown application when hook unmounts */
        return () => subscription.unsubscribe();
    }, [fusion, currentApp, ref, isLoading]);

    if (error) {
        if (error.cause instanceof AppManifestError) {
            return (
                <div>
                    <h2>🔥 Failed to load application manifest 🤬</h2>
                    <h3>{error.cause.type}</h3>
                    <ErrorViewer error={error} />;
                </div>
            );
        }
        return (
            <div>
                <h2>🔥 Failed to load application 🤬</h2>
                <ErrorViewer error={error} />;
            </div>
        );
    }

    return (
        <section style={{ height: '100%' }} id="application-content" ref={ref}>
            {loading && <EquinorLoader text="Loading Application" />}
        </section>
    );
};

export default AppLoader;
