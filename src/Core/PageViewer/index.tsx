import { useEffect } from 'react';
import { useSidesheetCleanup } from '../PopoutSidesheet/Hooks/useSidesheetCleanup';
import { PageViewer } from './Components/PageViewer/PageViewer';
import { usePageViewer } from './Hooks/usePageViewer';

export const PageView = (): JSX.Element => {
    const { closeSidesheet } = useSidesheetCleanup();
    useEffect(() => {
        closeSidesheet();
    }, []);
    const viewState = usePageViewer();
    return <PageViewer {...viewState} />;
};

export default PageView;

export * from './Api/pageViewerApi';
export * from './Api/pageViewerState';
