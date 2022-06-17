import { IDBPDatabase, openDB } from 'idb';
import { FilterStore } from './Filter/filterStore';
import { TableStore } from './Table/tableStore';

const WORKSPACE_DB_NAME = 'workspace_db';

const getDbInstance = async () => await open();

async function put(storeName: string, key: string, value: any): Promise<IDBValidKey> {
    return await (await open()).put(storeName, value, key);
}

async function open(): Promise<IDBPDatabase<unknown>> {
    return await openDB(WORKSPACE_DB_NAME, 1, {
        upgrade: (db) => {
            db.createObjectStore(FilterStore.name);
            db.createObjectStore(TableStore.name);
        },
    });
}

async function getValue<T = unknown>(storeName: string, key: string): Promise<T> {
    const db = await getDbInstance();
    return await db.get(storeName, key);
}

export function getWorkspaceDb() {
    return {
        open,
        put,
        getValue,
    };
}
