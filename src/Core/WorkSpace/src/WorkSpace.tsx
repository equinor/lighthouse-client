import { ClientApi } from '../../../apps/apps';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { DataProvider } from './Context/DataProvider';

export const WorkSpace = (props: ClientApi): JSX.Element => {
    return (
        <DataProvider>
            <WorkSpaceView {...props} />
        </DataProvider>
    );
};
