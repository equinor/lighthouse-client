import { AppApi } from '../../../apps/apps';
import { DataViewer } from './Components/DataViewer';
import { DataProvider } from './Context/DataProvider';

export const DataView = (props: AppApi): JSX.Element => {
    return (
        <DataProvider>
            <DataViewer {...props} />
        </DataProvider>
    );
};
