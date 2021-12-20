export function groupBy<T>(list: T[], accessor: keyof T) {
    const map = new Map();
    list.forEach((item) => {
         const key = item[accessor];
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}