import { SizeIcons, StatusCircle, FlagIcon } from '@equinor/GardenUtils';
import { useRef, useState } from 'react';
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
import {
    Circles,
    WorkOrderWrapper,
    Progress,
    MidSection,
    WorkorderExpanded,
    WorkorderExpandedTitle,
} from './styles';
import { itemSize } from './utils';

export const WorkOrderItem = ({
    data,
    itemKey,
    onClick,
    columnExpanded,
}: CustomItemView<WorkOrder>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const { groupByKeys, gardenKey } = useParkViewContext<WorkOrder>();
    const mccrColor = getMccrStatusColor(data);
    const matColor = getMatStatusColor(data);
    const matStatus = getMatStatus(data);
    const statusMap = getStatus(groupByKeys[0] || gardenKey);
    const colorMap = getColor(groupByKeys[0] || gardenKey);
    const status = statusMap(data);
    const backgroundColor = colorMap[status];
    const textColor = getTextColorForStatus(status);
    const size = itemSize(data.estimatedHours);
    const progressBar = `linear-gradient(90deg, black ${parseInt(
        data.projectProgress,
        10
    )}%, transparent ${parseInt(data.projectProgress, 10)}%)`;

    return (
        <>
            <WorkOrderWrapper
                backgroundColor={backgroundColor}
                textColor={textColor}
                background={progressBar}
                ref={anchorRef}
                onMouseOver={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={onClick}
            >
                <SizeIcons size={size} color={textColor} />
                {data.holdBy && <FlagIcon color={textColor} />}
                <MidSection expanded={columnExpanded}>
                    {data[itemKey]}
                    {columnExpanded && <WorkorderExpandedView data={data} />}
                </MidSection>
                <Circles>
                    <StatusCircle statusColor={matColor} />
                    <StatusCircle statusColor={mccrColor} />
                </Circles>
                <Progress background={progressBar} />
            </WorkOrderWrapper>
            {isOpen && (
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
            )}
        </>
    );
};
export function WorkorderExpandedView({ data }: { data: WorkOrder }): JSX.Element {
    return (
        <WorkorderExpanded>
            <WorkorderExpandedTitle>{data.description}</WorkorderExpandedTitle>
        </WorkorderExpanded>
    );
}
