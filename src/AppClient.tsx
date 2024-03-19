import {
  ClientContextProvider,
  fetchConfig,
  useHttpClient,
} from '@equinor/lighthouse-portal-client';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/Layouts/MainLayout';
import { MenuProvider } from './components/Menu';
import { ServiceMessageBanner, useServiceMessage } from './components/Messages';
import { ClientRoutes, ContextGuard } from './components/Routes/Routes';
import ClientTopBar from './components/TopBar/TopBar';
import { ConfirmationDialog } from './Core/ConfirmationDialog/Components/ConfirmationDialog';
import { Framework } from '@equinor/fusion-framework-react';
import EquinorLoader from './fusion-framework/EquinorLoader';
import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { Suspense, useEffect, useMemo } from 'react';
import { createConfig } from './fusion-framework/config';
import {
  registerAppConfig,
  registerClientRegistry,
  registerClients,
} from './Core/Client/Functions/RegisterActions';
import { appsProvider } from './Core/Client/Service/appsProvider';
import { setupApps } from './Core/Client/Service/setupApps';
import { setupContext } from './Core/Client/Service/setupContext';
import { AppConfigResult } from './Core/Client/Types/AppConfig';
import { getAppGroups, getApps } from './apps/apps';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default cachetime 2 minutes
      cacheTime: 2000 * 60,
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: 1000,
    },
    mutations: {
      retry: false,
      retryDelay: 1000,
    },
  },
});

export const Bootstrap = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary FallbackComponent={() => <div>Portal failed to load</div>}>
      <Suspense fallback={<EquinorLoader text={'Loading portal'} />}>
        <ClientEntry />
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);

const ClientEntry = () => {
  const { data } = useQuery(
    ['config'],
    async () => {
      const config = await fetchConfig();
      registerAppConfig(config);
      return config;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      keepPreviousData: true,
      suspense: true,
      useErrorBoundary: true,
    }
  );

  if (!data) {
    throw new Error('Portal failed to setup');
  }
  const fusionConfig = useMemo(() => createConfig(data), [data]);

  return (
    <Framework fallback={<EquinorLoader text={'Loading portal'} />} configure={fusionConfig}>
      <Client appConfig={data} />
    </Framework>
  );
};

type ClientProps = {
  appConfig: AppConfigResult;
};
const Client = ({ appConfig }: ClientProps): JSX.Element => {
  const client = useHttpClient('scopeChange');
  useSetupClients();
  const contextClient = useHttpClient('fusionContext');

  useQuery(
    ['setup'],
    async () => {
      registerClientRegistry(
        setupApps(appsProvider(getApps, getAppGroups, false), appConfig, client)
      );
      await setupContext(contextClient);
    },
    {
      suspense: true,
      useErrorBoundary: true,
      cacheTime: Infinity,
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );

  const messageData = useServiceMessage();

  return (
    <>
      <ConfirmationDialog />
      <ClientContextProvider>
        {messageData.isActive && <ServiceMessageBanner {...messageData} />}
        <MenuProvider>
          <BrowserRouter>
            <ClientTopBar />
            <MainLayout serviceMessageActive={messageData.isActive}>
              <ContextGuard>
                <ClientRoutes />
              </ContextGuard>
            </MainLayout>
          </BrowserRouter>
        </MenuProvider>
      </ClientContextProvider>
    </>
  );
};

const useSetupClients = () => {
  const scopeChange = useHttpClient('scopeChange');
  const FAM = useHttpClient('FAM');
  const STID = useHttpClient('STID');
  const echoHierarchy = useHttpClient('echoHierarchy');
  const echoModelDist = useHttpClient('echoModelDist');
  const fusion = useHttpClient('fusion');
  const fusionBookmarks = useHttpClient('fusionBookmarks');
  const fusionContext = useHttpClient('fusionContext');
  const fusionDataproxy = useHttpClient('fusionDataproxy');
  const fusionNotifications = useHttpClient('fusionNotifications');
  const fusionPbi = useHttpClient('fusionPbi');
  const fusionPeople = useHttpClient('fusionPeople');
  const fusionTasks = useHttpClient('fusionTasks');
  const procosys = useHttpClient('procosys');
  const releaseControls = useHttpClient('releaseControls');

  useEffect(() => {
    registerClients({
      echoHierarchy,
      echoModelDist,
      FAM,
      fusion,
      fusionBookmarks,
      fusionContext,
      fusionDataproxy,
      fusionNotifications,
      fusionPbi,
      fusionPeople,
      fusionTasks,
      procosys,
      releaseControls,
      scopeChange,
      STID,
    });
  }, []);
};
