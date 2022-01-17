import { ErrorBoundary } from '@equinor/ErrorBoundary';
import ErrorFallback from '../ErrorBoundary/Components/ErrorFallback';
import { PageViewer } from './Components/PageViewer/PageViewer';
import { usePageViewer } from './Hooks/usePageViewer';

export const PageView = (): JSX.Element => {
    const viewState = usePageViewer();
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} routeName={viewState.title}>
            <PageViewer {...viewState} />;
        </ErrorBoundary>
    );
};

export default PageView;

export * from './Api/pageViewerApi';
export * from './Api/pageViewerState';
