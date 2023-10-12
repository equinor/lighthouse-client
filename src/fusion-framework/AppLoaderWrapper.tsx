import AppLoader from './AppLoader';

export function AppLoaderWrapper({ appKey }: { appKey: string }) {
    return (
        <div style={{ height: '100%' }}>
            <AppLoader appKey={appKey} />
        </div>
    );
}
