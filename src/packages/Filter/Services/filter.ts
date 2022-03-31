// import { FilterData } from '../Types/FilterItem';
// import { parseGroupValueFunctions } from '../Utils/optionParse';

// interface FilterGroup {
//     type: string;
//     values: string[];
// }

// export function filter<T>(data: T[], filter: FilterData, groupValue?: string): T[] {
//     if (data.length === 0) return [];

//     const groupValueFunctions = parseGroupValueFunctions(groupValue);
//     const filterGroups: FilterGroup[] = Array.from(Object.values(filter)).map((x) => ({
//         type: x.type,
//         values: Object.values(x.value)
//             .filter((value) => !value.checked)
//             .map((y) => y.value),
//     }));

//     function filterValueFormatter(item: T, group: string): string {
//         const getValue =
//             groupValueFunctions &&
//             typeof groupValueFunctions[group] === 'function' &&
//             groupValueFunctions[group];
//         return getValue ? getValue(item) : item[group];
//     }

//     return data.filter((item) =>
//         filterGroups.every(
//             (group) => !group.values.includes(filterValueFormatter(item, group.type))
//         )
//     );
// }
