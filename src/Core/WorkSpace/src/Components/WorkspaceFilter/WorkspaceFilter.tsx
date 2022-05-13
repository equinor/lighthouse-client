import { FilterView } from '@equinor/filter';
import { useViewerContext } from '../../Context/ViewProvider';

export const WorkspaceFilter = (): JSX.Element => {
    const { isFilterActive } = useViewerContext();
    return <FilterView isActive={isFilterActive} />;
};
