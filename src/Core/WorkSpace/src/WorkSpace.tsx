import { AppApi } from '../../../apps/apps';
import { DataViewer } from './Components/DataViewer/DataViewer';
import { DataProvider } from './Context/DataProvider';

export const WorkSpace = (props: AppApi): JSX.Element => {
    return (
        <DataProvider>
            <DataViewer {...props} />
        </DataProvider>
    );
};
