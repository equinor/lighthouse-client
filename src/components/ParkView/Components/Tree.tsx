import { TreeOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { ParkViewProvider } from '../Context/ParkViewProvider';
import { NoTreeOptions } from './NoTreeOptions';
import { TreeView } from './TreeView';

interface TreeProps<T> {
    treeOptions: TreeOptions<T> | undefined;
    data: T[];
}

export const Tree = ({ treeOptions, data }: TreeProps<unknown>): JSX.Element => {
    return treeOptions ? (
        <ParkViewProvider parkViewOptions={treeOptions} data={data}>
            <TreeView />
        </ParkViewProvider>
    ) : (
        <NoTreeOptions />
    );
};
