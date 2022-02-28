import { HandoverPackage } from '../models/handoverPackage';
import { getStatus, statusPriorityMap } from './handoverItemMapping';

export const sortPackagesByStatus = (a: HandoverPackage, b: HandoverPackage): number =>
    statusPriorityMap[getStatus(b)] - statusPriorityMap[getStatus(a)] ||
    a.commpkgNo.localeCompare(b.commpkgNo);

export const sortByNumber = (a: string, b: string): number =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
