import {
    FollowUpStatuses,
    HandoverMcpkg,
    HandoverResourceTypes,
    HandoverWorkOrder,
    materialAvailable,
    materialOk,
} from '@equinor/GardenUtils';
import { SortByFn } from 'react-table';
import tinycolor from 'tinycolor2';
import { HandoverPackageStatus } from '../../../models';
import { colorMap } from '../../../utility/handoverItemMapping';

export const createGradient = (color: string, isDemolition?: boolean): string[] => {
    const baseColor = tinycolor(color);
    const colors = [baseColor.spin(5).darken(10).toHexString(), color] as string[];

    return isDemolition ? colors.reverse() : colors;
};

export const getPunchStatusGradient = (status: HandoverPackageStatus): string[] =>
    status === 'OS' ? ['#afafaf', '#afafaf'] : createGradient(colorMap[status]);

export const createGradientBackground = (colors: string[]): string =>
    `linear-gradient(to right, ${colors[0]} 0%, ${colors[1]} 100%)`;

export const getRFCCStatus = (item: HandoverMcpkg): HandoverPackageStatus =>
    item.rfccIsAccepted
        ? 'RFCC Accepted'
        : item.rfccIsRejected
        ? 'RFCC Rejected'
        : item.rfccIsShipped
        ? 'RFCC Sent'
        : 'OS';

export const getRFOCStatus = (item: HandoverMcpkg): HandoverPackageStatus =>
    item.rfocIsAccepted
        ? 'RFOC Accepted'
        : item.rfocIsRejected
        ? 'RFOC Rejected'
        : item.rfocIsShipped
        ? 'RFOC Sent'
        : 'OS';

export const comparePackage =
    <T extends HandoverResourceTypes>(key: string): SortByFn<T> =>
    (objA, objB, id, _desc) => {
        const a = objA.values[id][key];
        const b = objB.values[id][key];
        return a === b ? 0 : a > b ? 1 : -1;
    };

export const workOrderOk = (workOrder: HandoverWorkOrder): boolean =>
    Boolean(
        workOrder.workOrderStatus.replace('-', '') ===
            ('W04' || 'W05' || 'W06' || 'W07' || 'W08' || 'W09' || 'W10')
    );

export const workOrderAvailable = (workOrder: HandoverWorkOrder): boolean =>
    Boolean(
        workOrder.workOrderStatus.replace('-', '') ===
            ('W03' || 'W04' || 'W05' || 'W06' || 'W07' || 'W08' || 'W09' || 'W10')
    );

export const getHandoverWorkOrderStatus = (workOrder: HandoverWorkOrder): FollowUpStatuses => {
    if (workOrder.projectProgress.toString() === '100') return FollowUpStatuses.WOFinished;

    if (materialOk(workOrder) && workOrderOk(workOrder)) return FollowUpStatuses.MaterialAndWoOk;

    if (materialAvailable(workOrder) && workOrderAvailable(workOrder))
        return FollowUpStatuses.MaterialAndWoAvailable;

    return FollowUpStatuses.MaterialAndOrWoNotAvailable;
};
