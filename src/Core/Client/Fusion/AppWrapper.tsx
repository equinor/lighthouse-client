import { useFusionContext } from '@equinor/fusion';
import { ErrorBoundary, ErrorMessage, Spinner } from '@equinor/fusion-components';
import { FC, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

type AppWrapperProps = {
    appKey?: string;
};

const AppWrapper: FC<AppWrapperProps> = ({ appKey }) => {
    const {
        app: { container: appContainer },
    } = useFusionContext();

    const [isFetching, setIsFetching] = useState(!appContainer?.currentApp);

    const currentApp = appContainer.currentApp;
    console.log(currentApp);

    const setCurrentApp = async () => {
        setIsFetching(true);
        try {
            await appContainer.setCurrentAppAsync(appKey || null);
        } catch (e) {
            console.error('No app found for app key ', appKey, e);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        setCurrentApp();
    }, [appKey]);

    useEffect(() => {
        return () => {
            appContainer.setCurrentAppAsync(null);
        };
    }, []);

    useEffect(() => {
        document.title = currentApp?.name ? `Fusion | ${currentApp?.name}` : 'Fusion';
        return () => {
            document.title = 'Fusion';
        };
    }, [currentApp?.name]);

    const [, forceUpdate] = useState(null);
    useEffect(() => {
        // If the app has been registered between rendering the app and useEffect
        if (appKey && !currentApp && appContainer.get(appKey)) {
            forceUpdate(null);
        }

        return appContainer.on('update', () => {
            forceUpdate(null);
        });
    }, [appKey]);

    // const { addScope, removeScope } = useQuickFactContext();
    // useEffect(() => {
    //     const scope = `app|${appKey}`;
    //     addScope(scope);
    //     return () => removeScope(scope);
    // }, [appKey]);

    if ((currentApp === null && isFetching) || (currentApp && currentApp.key !== appKey)) {
        return <Spinner centered floating />;
    }

    if (!currentApp) {
        return (
            <ErrorMessage
                hasError
                errorType="notFound"
                title="Unable to find the selected app"
                message="The app may not exist or has been removed. Try reselecting the app from the Portal. If the app is not listed, or will not open, please contact support."
            />
        );
    }
    const AppComponent = currentApp.AppComponent;
    if (!AppComponent) {
        return (
            <ErrorMessage
                hasError
                errorType="error"
                title="There seems to be something wrong with this app"
                message=""
            />
        );
    }

    return (
        <ErrorBoundary>
            <BrowserRouter>
                <AppComponent />
            </BrowserRouter>
        </ErrorBoundary>
    );
};

export default AppWrapper;
