/* export const itemSorter = (a: HandoverPackage, b: HandoverPackage) =>
    statusPriorityMap[getStatus(b)] - statusPriorityMap[getStatus(a)] ||
    a.commpkgNo.localeCompare(b.commpkgNo);
 */

export const sortProgress = (a: string, b: string): number =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
