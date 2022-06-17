import { getWorkspaceDb } from '../workspaceDB';

const { getValue, put } = getWorkspaceDb();

export const TableStore = {
    name: 'TableSettings',
    columnOrder: 'columnOrder',
    getColumnOrder: (): Promise<string[]> => getValue(TableStore.name, TableStore.columnOrder),
    updateColumnOrder: async (columnOrder: string[]): Promise<void> => {
        await put(TableStore.name, TableStore.columnOrder, columnOrder);
    },
};
