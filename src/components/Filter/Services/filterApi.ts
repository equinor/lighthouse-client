import { wrap } from 'comlink';
import JSONfn from 'json-fn';
import Worker from 'worker-loader!./filterWorker.ts';
import { FilterData, FilterDataOptions } from '../Types/FilterItem';
import { FilterWorker } from './filterWorker';

const worker = new Worker();

const comlinkWorker = wrap<FilterWorker>(worker, {
    name: 'filter-worker',
    type: 'module'
});

export type ProxyFunction = (item: unknown) => string;
export type GrouperFunctions = Record<string, (item: unknown) => string>;

function createGroupValueProxyFunctions(
    groupValue?: GrouperFunctions
): ProxyFunction[] {
    if (groupValue) return Object.values(groupValue).map((func) => func);
    else return [];
}

function createGroupValueProxyFunctionsMap(
    groupValue?: GrouperFunctions
): string[] | undefined {
    if (groupValue) return Object.keys(groupValue).map((key) => key);
}

export async function workerFilter<T>(
    data: T[],
    filter: FilterData,
    options?: FilterDataOptions<T>
): Promise<T[]> {
    const proxyFunctions = createGroupValueProxyFunctions(
        options?.groupValue as GrouperFunctions
    );
    const filteredData = (await comlinkWorker.filter(
        data,
        filter,
        options && JSONfn.stringify(options?.groupValue)
        // createGroupValueProxyFunctionsMap(
        //     options?.groupValue as GrouperFunctions
        // )
        // ...proxyFunctions
    )) as T[];

    return filteredData;
}
