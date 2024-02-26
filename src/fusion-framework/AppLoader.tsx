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
      var blob = await (await fusionClient.fetch(`bundles/apps/${appKey}.js`, { signal })).blob().catch(e => {
        console.error("Failed to parse blob", e)
      })
      if (!blob) {
        throw new Error("Failed to load blob")
      }
      return URL.createObjectURL(blob);
    },
    { structuralSharing: false, cacheTime: Infinity, staleTime: Infinity, }
  );

  const isLoading = manifestLoading || configLoading || bundleLoading;

  const ref = useRef<HTMLElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

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
    if (config && manifest && bundle) {
      const el = document.createElement('div');
      el.style.display = 'contents';
      el.style.height = '100%';
      if (!ref.current) {
        throw Error('Missing application mounting point');
      }

      ref.current.appendChild(el);

      const url = bundle 

      import(/* @vite-ignore */ url).then((script) => {
        const render = script.renderApp ?? script.default;
        try {
          subscription.add(
            render(el, {
              fusion,
              env: { basename: window.location.host, config, manifest },
            })
          );
        } catch (e) {
          console.error(e)
        }
        setLoading(false);
      });
      URL.revokeObjectURL(url);
      subscription.add(() => el.remove());
    }

    /** teardown application when hook unmounts */
    return () => subscription.unsubscribe();
  }, [fusion, currentApp, ref, isLoading, config, bundle, manifest]);

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
