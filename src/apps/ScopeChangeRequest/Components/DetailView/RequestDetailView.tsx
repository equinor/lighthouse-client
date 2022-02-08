import { useSideSheet } from '../../../../packages/Sidesheet/context/sidesheetContext';
import { SplitView } from './Components/RequestDetailView/Double';
import { SingleView } from './Components/RequestDetailView/Single';

export const RequestDetailView = (): JSX.Element => {
    const { width } = useSideSheet();

    return <>{width > 650 ? <SplitView /> : <SingleView />}</>;
};
