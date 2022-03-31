// import { wrap } from 'comlink';
// import { FilterData, FilterOptions } from '../Types/FilterItem';
// import { groupValueTopString } from '../Utils/optionParse';
// import { FilterWorker } from './filterWorker';
// import Worker from './filterWorker?worker';

// export async function workerFilter<T>(
//     data: T[],
//     filter: FilterData,
//     options?: FilterOptions<T>
// ): Promise<T[]> {
//     const worker = new Worker();

//     const comlinkWorker = wrap<FilterWorker>(worker, {
//         name: 'filter-worker',
//         type: 'module',
//     });

//     const filteredData = (await comlinkWorker.filter(
//         data,
//         filter,
//         groupValueTopString(options)
//     )) as T[];

//     worker.terminate();
//     return filteredData;
// }
