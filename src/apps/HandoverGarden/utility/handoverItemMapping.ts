import { HandoverPackage } from '../models/HandoverPackage';
import { tokens } from '@equinor/eds-tokens';

export type ProCoSysStatuses =
    | 'AS Built completed'
    | 'WO Sent to planning'
    | 'WO Sent DC'
    | 'WO compl. By MC'
    | 'WO from Field'
    | 'WO to Field'
    | 'MC docs prepared'
    | 'WO to MC'
    | 'WO Cancelled'
    | 'WO Prepared'
    | 'No status';

export const proCoSysWorkOrderColorMap: Record<ProCoSysStatuses, string> = {
    'AS Built completed': 'hsla(218, 100%, 92%, 1)',
    'WO Sent to planning': 'hsla(218, 100%, 32%, 1)',
    'MC docs prepared': 'hsla(60, 85%, 62%, 1)',
    'WO to Field': 'hsla(123, 70%, 52%, 1)',
    'WO from Field': 'hsla(123, 70%, 72%, 1)',
    'WO compl. By MC': 'hsla(218, 100%, 52%, 1)',
    'WO Cancelled': 'hsla(12, 85%, 72%, 1)',
    'WO Sent DC': 'hsla(218, 100%, 72%, 1)',
    'WO to MC': 'hsla(12, 70%, 82%, 1)',
    'WO Prepared': 'hsla(0, 0%, 72%, 1)',
    'No status': 'hsla(12, 85%, 50%, 1)',
};

export const proCoSysWorkOrderProgressColorMap: Record<ProCoSysStatuses, string> = {
    'AS Built completed': 'hsla(218, 100%, 80%, 1)',
    'WO Sent to planning': 'hsla(218, 100%, 15%, 1)',
    'MC docs prepared': 'hsla(60, 85%, 50%, 1)',
    'WO to Field': 'hsla(123, 70%, 45%, 1)',
    'WO from Field': 'hsla(123, 70%, 60%, 1)',
    'WO compl. By MC': 'hsla(218, 100%, 40%, 1)',
    'WO Cancelled': 'hsla(12, 85%, 60%, 1)',
    'WO Sent DC': 'hsla(218, 100%, 60%, 1)',
    'WO to MC': 'hsla(12, 70%, 70%, 1)',
    'WO Prepared': 'hsla(0, 0%, 60%, 1)',
    'No status': 'hsla(12, 85%, 40%, 1)',
};

export type FollowUpStatuses =
    | 'WO Finished'
    | 'Material and Workorder OK'
    | 'Material and Workorder Available'
    | 'Material and/or Workorder not Available';

export const followUpColorMapRecord: Record<FollowUpStatuses, string> = {
    'WO Finished': 'hsla(218, 100%, 52%, 1)',
    'Material and Workorder OK': 'hsla(123, 70%, 65%, 1)',
    'Material and Workorder Available': 'rgb(255, 255, 0)',
    'Material and/or Workorder not Available': 'hsla(12, 85%, 72%, 1)',
};

export type MaterialStatus =
    | 'M10'
    | 'M12'
    | 'M2'
    | 'M6'
    | 'M7'
    | 'M9'
    | 'MN'
    | 'MN1'
    | 'MNX1'
    | 'MNX2';

export const materialStatusMap: Record<MaterialStatus, string> = {
    M10: 'Material requested to job site',
    M12: 'Material received on job site',
    M2: 'Materials linked to Smartpack/Jobcard',
    M6: 'Material partly delivered',
    M7: 'Materials fully delivered',
    M9: 'Material returned',
    MN: 'No Material required',
    MN1: 'Additional material to be issued Offshore from Min/Max Stock',
    MNX1: 'Materials not linked to Smartpack/Jobcard',
    MNX2: 'Materials partially linked to Smartpack/Jobcard',
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
