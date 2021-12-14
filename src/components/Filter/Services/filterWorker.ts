import { expose } from 'comlink';
import ctx from '../../../packages/WebWorkers/setup';
import { FilterData } from '../Types/FilterItem';
import { filter } from './filter';

export const filterWorker = {
    filter,
};

export interface FilterWorker extends Worker {
    filter: <T>(
        data: T[],
        filter: FilterData,
        options?: string,
        groupValueMap?: string[]
        // ...groupValue: ProxyFunction[]
    ) => T[];
}

expose(filterWorker, ctx);
