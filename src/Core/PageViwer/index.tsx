import { PageViewer } from './Components/PageViewer/PageViewer';
import { usePageViewer } from './Hooks/usePageViewer';

export const PageView = (): JSX.Element => {
    const viewState = usePageViewer();
    return <PageViewer {...viewState} />;
};

export default PageView;
