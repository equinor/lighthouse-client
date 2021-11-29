import { TreeOptions } from '../../CompletionView/src/DataViewerApi/DataViewState';
import { ParkViewProvider } from '../Context/ParkViewProvider';
import { TreeView } from './TreeView';
import { NoTreeOptions } from './NoTreeOptions';

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
