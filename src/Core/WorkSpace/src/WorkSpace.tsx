import { AppApi } from '../../../apps/apps';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { DataProvider } from './Context/DataProvider';

export const WorkSpace = (props: AppApi): JSX.Element => {
    return (
        <DataProvider>
            <WorkSpaceView {...props} />
        </DataProvider>
    );
};
