import { DataProvider } from '../../Context/DataProvider';
import { DashboardViewer } from './DashbaordViwer';

interface DashboardPageProps {
    dashboardId: string;
    isFilterActive: boolean;
}

export const DashboardPage = ({ dashboardId, isFilterActive }: DashboardPageProps): JSX.Element => {
    return (
        <DataProvider dashboardId={dashboardId}>
            <DashboardViewer isFilterActive={isFilterActive} />
        </DataProvider>
    );
};
