import { FieldSettings } from '../../../components/ParkView/Models/FieldSettings';
import { SwcrPackage } from '../models/SwcrPackage';
import {
    getIsSafetyKey,
    getHoursGroupKey,
    getTypeKeys,
    getNextToSignKeys,
    getNextSignatureRoleKeys,
    getLatestSignedRankingKey,
    getRfccKey,
    getRfccDueDateKey,
    getStartImplForecastKey,
    getRfocKey,
    getYearAndWeekFromString,
} from './packages';

import {
    sortByEstimatedManHours,
    sortByIsSafety,
    sortByLastSignedRanking,
    sortBySwcrStatusPriority,
} from './sortFunctions';

export type ExtendedSwcrGardenFields =
    | 'isSafety'
    | 'RFCC'
    | 'RFCCDueDate'
    | 'RFOC'
    | 'isSafety'
    | 'startImplForecast'
    | 'nextSignatureRole';

export const fieldSettings: FieldSettings<SwcrPackage, ExtendedSwcrGardenFields> = {
    isSafety: { label: 'Is Safety', getKey: getIsSafetyKey, getSort: sortByIsSafety },
    estimatedManhours: {
        label: 'Estimated man hours',
        getKey: getHoursGroupKey,
        getSort: sortByEstimatedManHours,
    },
    types: { label: 'Types', getKey: getTypeKeys },
    nextToSign: { label: 'Next signature by', getKey: getNextToSignKeys },
    nextSignatureRole: { label: 'Next signature role', getKey: getNextSignatureRoleKeys },
    latestSignRanking: {
        label: 'Last signed ranking',
        getKey: getLatestSignedRankingKey,
        getSort: sortByLastSignedRanking,
    },
    RFCC: { label: 'RFCC', getKey: getRfccKey },
    RFCCDueDate: { label: 'RFCC duedate', getKey: getRfccDueDateKey },
    startImplForecast: { label: 'Start impl. forecast', getKey: getStartImplForecastKey },
    RFOC: { label: 'RFOC', getKey: getRfocKey },
    closedAtDate: {
        label: 'Closed at date',
        getKey: (item) => [getYearAndWeekFromString(item.closedAtDate)],
    },
    dueAtDate: {
        label: 'Due date',
        getKey: (item) => [getYearAndWeekFromString(item.dueAtDate)],
    },
    siteCode: { label: 'Site Code' },
    projectIdentifier: { label: 'ProjectIdentifier' },
    swcrNo: { label: 'Swcr No' },
    priority: { label: 'Priority' },
    system: { label: 'System' },
    controlSystem: { label: 'Control System' },
    contract: { label: 'Contract' },
    action: { label: 'Action' },
    supplier: { label: 'Supplier' },
    node: { label: 'Node' },
    referenceTypes: { label: 'Reference Types' },
    nextSignRanking: { label: 'Next signature ' },
    cpkgNo: { label: 'CommPK' },
    cpkgPhase: { label: 'Phase' },
    status: { key: 'status', label: 'Status', getSort: sortBySwcrStatusPriority },
};
