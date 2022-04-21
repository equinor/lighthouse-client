import { FlagIcon, ProcosysStatuses, FollowUpStatuses } from '@equinor/GardenUtils';
import { memo, useMemo, useRef, useState } from 'react';
import { useParkViewContext } from '../../../../../components/ParkView/Context/ParkViewProvider';
import { CustomItemView } from '../../../../../components/ParkView/Models/gardenOptions';
import { WorkOrder } from '../../models';
import {
    getMatStatusColor,
    getMccrStatusColor,
    getStatus,
    getColor,
    getTextColorForStatus,
    getMatStatus,
} from '../../utility';
import { WorkOrderPopover } from '../Popover/WorkOrderPopover';
import { WorkOrderWrapper, Root, Sizes, StatusCircles, ItemText } from './styles';
import { itemSize } from './utils';
type PackageStatusReturn = {
    mccrColor: string;
    matColor: string;
    matStatus: string;
    backgroundColor: string;
    textColor: string;
    size: 'small' | 'medium' | 'large';
    progressBar: string;
    status: ProcosysStatuses | FollowUpStatuses;
};
const getWorkOrderStatuses = (
    data: WorkOrder,
    gardenKey: keyof WorkOrder,
    groupByKeys: (keyof WorkOrder)[]
): PackageStatusReturn => {
    const mccrColor = getMccrStatusColor(data);
    const matColor = getMatStatusColor(data);
    const matStatus: string = getMatStatus(data);
    const statusMap = getStatus(groupByKeys[0] || gardenKey);
    const colorMap = getColor(groupByKeys[0] || gardenKey);
    const status = statusMap(data);
    const backgroundColor = colorMap[status];
    const textColor = getTextColorForStatus(status);
    const size = itemSize(Number(data?.estimatedHours));
    const progressBar = `linear-gradient(90deg, #706b6b ${parseInt(
        data?.projectProgress ?? '0',
        10
    )}%, transparent ${parseInt(data?.projectProgress ?? '0', 10)}%)`;
    return {
        mccrColor,
        matColor,
        matStatus,
        backgroundColor,
        textColor,
        size,
        progressBar,
        status,
    };
};
const WorkOrderItem = ({
    data,
    itemKey,
    onClick,
    columnExpanded,
    depth,
    selectedItem,
    width: itemWidth = 300,
}: CustomItemView<WorkOrder>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const { groupByKeys, gardenKey } = useParkViewContext<WorkOrder>();

    const {
        backgroundColor,
        textColor,
        progressBar,
        size,
        matStatus,
        matColor,
        mccrColor,
        status,
    } = useMemo(
        () => getWorkOrderStatuses(data, gardenKey, groupByKeys),
        [data, gardenKey, groupByKeys]
    );

    const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
    const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);
    return (
        <>
            {/* {isOpen && (
                <WorkOrderPopover
                    data={data}
                    anchorRef={anchorRef}
                    isOpen={isOpen}
                    itemOptions={{
                        barColor: backgroundColor,
                        textColor: textColor,
                        milestone: status,
                        size,
                        matStatus,
                        matColor,
                        mccrColor,
                    }}
                />
            )} */}
            <Root>
                <WorkOrderWrapper
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                    background={progressBar}
                    ref={anchorRef}
                    onMouseOver={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    onClick={onClick}
                    style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
                    progressBackground={progressBar}
                    isSelected={selectedItem?.workOrderNumber === data.workOrderNumber}
                >
                    <Sizes size={size} color={textColor} />
                    {data.holdBy && <FlagIcon color={textColor} />}
                    <ItemText>{data[itemKey]}</ItemText>
                    <StatusCircles matColor={matColor} mccrColor={mccrColor} />
                </WorkOrderWrapper>
                {columnExpanded && data.description}
            </Root>
        </>
    );
};

export default memo(WorkOrderItem);
