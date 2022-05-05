import { TableOptions } from '@equinor/WorkSpace';
import { McPackage } from '../../types';

const hiddenColumns: (keyof McPackage)[] = [
    'commPkgId',
    'url',
    'tacIsAccepted',
    'tacForecastDate',
    'tacIsShipped',
    'tacPlannedDate',
    'tagVolume',
    'createdDate',
    'siteCodes',
    'updatedDate',
    'searchableValues',
];

export const tableConfig: TableOptions<McPackage> = {
    objectIdentifierKey: 'mcPkgId',
    hiddenColumns,
};
