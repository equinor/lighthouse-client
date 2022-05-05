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
    'projectIdentifier',
    'projectDescription',
    'commPkgNumber',
    'mcPkgId',
    'disciplineDescription',
    'priorityDescription',
    'priority2Description',
    'priority3Description',
    'date',
    'order',
    'rowKey',
    'isVoided',
];

export const tableConfig: TableOptions<McPackage> = {
    objectIdentifierKey: 'mcPkgId',
    hiddenColumns,
};
