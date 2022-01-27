import { SortByFn } from 'react-table';
import tinycolor from 'tinycolor2';
import { HandoverPackageStatus } from '../../../models/HandoverPackage';
import {
    HandoverMcpkg,
    HandoverResourceTypes,
    HandoverWorkOrder,
} from '../../../models/HandoverResources';
import { colorMap, FollowUpStatuses } from '../../../utility/handoverItemMapping';

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

const prepareMaterialStatus = (status: string): string[] => {
    status = status.toLowerCase();

    const number = status.replace(/[^0-9]+/, '');
    return number.length ? [status, 'm' + number.padStart(2, '0')] : [status];
};

const woHasMaterialStatus = (workOrder: HandoverWorkOrder, ...statuses: string[]) => {
    const materialStatuses = statuses
        .map((status) => prepareMaterialStatus(status))
        .reduce((all, current) => all.concat(current), []);
    const woMaterialStatus = workOrder.materialStatus.toLowerCase();
    return materialStatuses.filter(
        (materialStatus) => woMaterialStatus.indexOf(materialStatus) === 0
    ).length;
};

export const materialOk = (workOrder: HandoverWorkOrder): number =>
    woHasMaterialStatus(workOrder, 'm12', 'm13', 'mn');

export const materialAvailable = (workOrder: HandoverWorkOrder): number =>
    woHasMaterialStatus(workOrder, 'm7', 'm9', 'm10', 'm11', 'mn');

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
    if (workOrder.projectProgress.toString() === '100') return 'WO Finished';

    if (materialOk(workOrder) && workOrderOk(workOrder)) return 'Material and Workorder OK';

    if (materialAvailable(workOrder) && workOrderAvailable(workOrder))
        return 'Material and Workorder Available';

    return 'Material and/or Workorder not Available';
};
