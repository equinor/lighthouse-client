import { FlagIcon, ProcosysStatuses, FollowUpStatuses, PopoverWrapper } from '@equinor/GardenUtils';
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
    const size = itemSize(data.estimatedHours);
    const progressBar = `linear-gradient(90deg, #706b6b ${parseInt(
        data.projectProgress,
        10
    )}%, transparent ${parseInt(data.projectProgress, 10)}%)`;
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
    isSelected,
    columnStart,
    parentRef,
    rowStart,
    width: itemWidth = 300,
}: CustomItemView<WorkOrder>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
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
            <Root>
                <WorkOrderWrapper
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                    background={progressBar}
                    ref={anchorRef}
                    onMouseEnter={() => {
                        hoverTimeout && !isOpen && clearTimeout(hoverTimeout);
                        setHoverTimeout(setTimeout(() => setIsOpen(true), 1000));
                    }}
                    onMouseLeave={() => {
                        hoverTimeout && clearTimeout(hoverTimeout);
                        setIsOpen(false);
                    }}
                    onClick={onClick}
                    style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
                    progressBackground={progressBar}
                    isSelected={isSelected}
                >
                    <Sizes size={size} color={textColor} />
                    {data.holdBy && <FlagIcon color={textColor} />}
                    <ItemText>{data[itemKey]}</ItemText>
                    <StatusCircles matColor={matColor} mccrColor={mccrColor} />
                </WorkOrderWrapper>
                {columnExpanded && data.description}
            </Root>
            {isOpen && (
                <PopoverWrapper
                    popoverTitle={`Wo.Number: ${data.workOrderNumber}`}
                    width={itemWidth}
                    columnStart={columnStart}
                    parentRef={parentRef}
                    rowStart={rowStart}
                    isOpen={isOpen}
                >
                    <WorkOrderPopover
                        data={data}
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
                </PopoverWrapper>
            )}
        </>
    );
};

export default memo(WorkOrderItem);
