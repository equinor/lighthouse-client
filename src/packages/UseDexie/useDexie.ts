import Dexie from 'dexie';
import { useState } from 'react';

export interface DexieSchema {
    [tableName: string]: string | null;
}

export type DbCallback = (db: Dexie) => void;

export function useCreateDexieDB<T>(
    name: string,
    schema: DexieSchema,
    version: number = 1,
    callback?: DbCallback
) {
    const [database, setDatabase] = useState<Dexie>();
    let db: Record<string, Dexie> = {};

    db[name] = new Dexie(name);
    db[name].version(version).stores(schema);

    callback && callback(db[name]);

    return db[name];
}

// export function useDexieDB(name: string) {
//     return db[name];
// }
