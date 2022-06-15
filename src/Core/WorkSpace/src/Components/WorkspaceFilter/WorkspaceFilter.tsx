import { useViewerContext } from '../../Context/ViewProvider';
import { QuickFilter } from '../QuickFilter/QuickFilter';

export const WorkspaceFilter = (): JSX.Element | null => {
    const { isFilterActive } = useViewerContext();

    if (!isFilterActive) return null;
    return <QuickFilter />;
};
