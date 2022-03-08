import { HandoverPackage, HandoverPackageStatus } from '../models/handoverPackage';
import { tokens } from '@equinor/eds-tokens';
import { FollowUpStatuses, statusColorMap } from '@equinor/GardenUtils';
//TODO see if it works with hex value colors
export const followUpColorMapRecord: Record<FollowUpStatuses, string> = {
    'WO Finished': 'hsla(218, 100%, 52%, 1)',
    'Material and WorkOrder OK': 'hsla(123, 70%, 65%, 1)',
    'Material and WorkOrder Available': 'rgb(255, 255, 0)',
    'Material and/or WorkOrder not Available': 'hsla(12, 85%, 72%, 1)',
};

export type Status =
    | 'PA'
    | 'PB'
    | 'RFOC Accepted'
    | 'RFOC Sent'
    | 'RFOC Rejected'
    | 'TAC Accepted'
    | 'TAC Sent'
    | 'TAC Rejected'
    | 'RFCC Rejected'
    | 'RFCC Accepted'
    | 'RFCC Sent'
    | 'DCC Accepted'
    | 'DCC Sent'
    | 'RFRC Accepted'
    | 'RFRC Sent'
    | 'OS'
    | 'No status'
    | 'OK';

export const colorMap: Record<Status, string> = {
    'No status': '#d1d1d1',
    'RFOC Sent': '#09CCF2',
    'RFOC Accepted': '#0035BC',
    'RFOC Rejected': '#FF3B3B',
    'RFCC Sent': '#C5E1A5',
    'RFCC Accepted': '#7CB342',
    'RFCC Rejected': '#FF3B3B',
    'TAC Sent': '#EDB882',
    'TAC Accepted': '#E77422',
    'TAC Rejected': '#FF3B3B',
    'DCC Sent': '#DCE775',
    'DCC Accepted': '#827717',
    'RFRC Sent': '#D7CCC8',
    'RFRC Accepted': '#5D4037',
    OS: '#D9E9F2',
    PB: '#ffc107',
    PA: '#ff4081',
    OK: '#00c853',
};

export const getDotsColor = (status: HandoverPackageStatus) => {
    switch (status) {
        case 'OS':
            return statusColorMap.OS;
        case 'PA':
            return statusColorMap.PA;
        case 'PB':
            return statusColorMap.PB;
        default:
            return statusColorMap.OK;
    }
};

export const statusPriorityMap: Record<Status, number> = {
    'RFOC Accepted': 0,
    'RFOC Sent': 1,

    'TAC Accepted': 2,
    'TAC Sent': 3,

    'RFCC Accepted': 4,
    'RFCC Sent': 5,

    'RFRC Accepted': 6,
    'RFRC Sent': 7,
    'DCC Accepted': 8,
    'DCC Sent': 9,
    OS: 10,
    'No status': 11,

    'RFCC Rejected': 12,
    'TAC Rejected': 13,
    'RFOC Rejected': 14,
    PA: 14,
    PB: 15,
    OK: 16,
};

export const getStatus = (item: HandoverPackage): Status => {
    if (
        item.mcPkgsRFOCSigned > 0 &&
        item.mcPkgsCount > 0 &&
        item.mcPkgsRFOCSigned === item.mcPkgsCount
    )
        return 'RFOC Accepted';

    if (item.rfocIsRejected) return 'RFOC Rejected';

    if (
        item.mcPkgsRFOCShipped > 0 &&
        item.mcPkgsCount > 0 &&
        item.mcPkgsRFOCShipped === item.mcPkgsCount
    )
        return 'RFOC Sent';

    if (item.tacIsAccepted) return 'TAC Accepted';

    if (item.tacIsShipped) return 'TAC Sent';

    if (item.tacIsRejected) return 'TAC Rejected';

    if (item.mcPkgsRFCCSigned && item.mcPkgsCount && item.mcPkgsRFCCSigned === item.mcPkgsCount)
        return 'RFCC Accepted';

    if (item.rfccIsRejected) return 'RFCC Rejected';

    if (
        item.mcPkgsRFCCShippedCount > 0 &&
        item.mcPkgsCount > 0 &&
        item.mcPkgsRFCCShippedCount === item.mcPkgsCount
    )
        return 'RFCC Sent';

    if (item.isDemolition && item.demolitionActualFinishDate) return 'RFRC Accepted'; //D04

    if (item.isDemolition && item.demolitionRFRCShippedDate) return 'RFRC Sent'; //D03

    if (item.isDemolition && item.demolitionDCCAcceptedDate) return 'DCC Accepted'; //D02

    if (item.isDemolition && item.demolitionActualStartDate) return 'DCC Sent'; //D01

    return 'OS';
};

export const getTextColor = (status: Status): string =>
    ['RFOC Accepted', 'RFRC Accepted', 'DCC Accepted'].includes(status)
        ? tokens.colors.text.static_icons__primary_white.rgba
        : tokens.colors.text.static_icons__default.rgba;
