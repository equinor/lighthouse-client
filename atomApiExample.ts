import { Atom, deref, swap, useAtom } from '@dbeining/react-atom';
import { useEffect } from 'react';

/** Types */
interface WorkspaceConfiguration {
    tableOptions: string[];
    gardenOptions: string[];
    filterOptions: FilterOptions;
}

interface FilterOptions {
    filterGroups: string[];
}
type AtomSelector<T, R> = (val: T) => R;

type OnAtomStateChanged = <R = WorkspaceConfiguration>(
    callback: (s: WorkspaceConfiguration) => void,
    select?: AtomSelector<WorkspaceConfiguration, R>
) => void;

type SelectFunction = <R = WorkspaceConfiguration>(
    selector?: AtomSelector<WorkspaceConfiguration, R>
) => R;
type ReturnValueFunction<T> = () => T;

// DO NOT EXPORT!
const workspaceAtom = Atom.of<WorkspaceConfiguration | null>(initializeWorkspaceSettings());

export interface WorkspaceApi<T> {
    /**
     * Will subscribe the component to the atom state
     */
    useAtomState: SelectFunction;
    /**
     * Will read a snapshot of the current value.
     * Usually called inside functions
     */
    readSnapshotValue: ReturnValueFunction<T>;
    /**
     * Do not expose update like this in an atom api.
     */
    update: (newVal: Partial<WorkspaceConfiguration> | null) => void;
    /**
     * Callback must be wrapped in useCallback or extracted outside the component
     * Pass in a select function to subscribe to a specific part of the state
     */
    useOnAtomStateChanged: OnAtomStateChanged;
}

// Safe to export
export const workspaceApi: WorkspaceApi<WorkspaceConfiguration> = {
    useAtomState: <R = WorkspaceConfiguration>(select?: AtomSelector<WorkspaceConfiguration, R>) =>
        useAtom(workspaceAtom, { select }),
    readSnapshotValue: () => deref(workspaceAtom),
    update: (newVal: Partial<WorkspaceConfiguration> | null) =>
        swap(workspaceAtom, (s) => ({ ...s, ...newVal })),
    useOnAtomStateChanged: <R = WorkspaceConfiguration>(
        callback: (s: WorkspaceConfiguration) => void,
        select?: AtomSelector<WorkspaceConfiguration, R>
    ) => {
        const s = workspaceApi.useAtomState(select);
        useEffect(() => {
            callback(workspaceApi.readSnapshotValue());
        }, [s, callback]);
    },
};

/**
 * Init will automatically be called when workspaceApi is referenced for the first time.
 * @returns
 */
function initializeWorkspaceSettings(): WorkspaceConfiguration {
    return {
        filterOptions: {
            filterGroups: ['Default group 1', 'Default group 2'],
        },
        gardenOptions: [],
        tableOptions: [],
    };
}
