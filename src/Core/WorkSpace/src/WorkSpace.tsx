import { ErrorBoundary, ErrorFallback } from '@equinor/ErrorBoundary';
import { ClientApi } from '@equinor/lighthouse-portal-client';
import { Route, Routes } from 'react-router-dom';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { WorkspaceProviders } from './Context/WorkspaceProviders';
import { useEffect } from 'react';
import { useCurrentUser } from '@equinor/fusion-framework-react-app/framework';

export type WorkspaceProps = Omit<ClientApi, 'createWorkSpace' | 'createPowerBiViewer'>;

export const WorkSpace = (props: WorkspaceProps): JSX.Element => {
  const user = useCurrentUser();

  useEffect(() => {
    const ai = window.AI;

    if (!ai) return;

    ai.trackEvent({
      name: `[App loaded]: ${props.title}`,
      properties: {
        appKey: props.title,
        url: window.location.toString(),
        userId: user?.localAccountId.split('.')[0] ?? '',
      },
    });
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} routeName={props.title}>
      <Routes>
        <Route
          path={`/`}
          element={
            <WorkspaceProviders>
              <WorkSpaceView {...props} />
            </WorkspaceProviders>
          }
        />
        <Route
          path={`/:id`}
          element={
            <WorkspaceProviders>
              <WorkSpaceView {...props} />
            </WorkspaceProviders>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
};
