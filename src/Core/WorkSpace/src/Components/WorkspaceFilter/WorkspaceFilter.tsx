import { useViewerContext } from '../../Context/ViewProvider';
import { WorkspaceQuickFilter } from '../QuickFilter/QuickFilter';

export const WorkspaceFilter = (): JSX.Element | null => {
    const { isFilterActive } = useViewerContext();

    if (!isFilterActive) return null;
    return <WorkspaceQuickFilter />;
};
