import {
    SizeIcons,
    StatusCircle,
    FlagIcon,
    ProcosysStatuses,
    FollowUpStatuses,
} from '@equinor/GardenUtils';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useExpand } from '../../../../../components/ParkView/Components/VirtualGarden/useExpand';
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
import './test.css';
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
const blah = (
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
    const progressBar = `linear-gradient(90deg, black ${parseInt(
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
const WorkOrderItem = ({ data, itemKey, onClick, columnExpanded }: CustomItemView<WorkOrder>) => {
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
    } = useMemo(() => blah(data, gardenKey, groupByKeys), [data, gardenKey, groupByKeys]);
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
                {/* <SizeIcons size={size} color={textColor} /> */}
                {/* {data.holdBy && <FlagIcon color={textColor} />} */}
                <div>{data[itemKey]}</div>
                {columnExpanded && (
                    <div style={{ alignSelf: 'center', fontSize: '14px' }}>{data.description}</div>
                )}
                {/* <MidSection expanded={columnExpanded}>
                    {data[itemKey]}
                    {columnExpanded && <WorkorderExpandedView data={data} />}
                </MidSection> */}
                <Circles>
                    {/* <StatusCircle statusColor={matColor} />
                    <StatusCircle statusColor={mccrColor} /> */}
                    {/* <div className="circle" />
                    <div className="circle" /> */}
                </Circles>
                {/* <Progress background={progressBar} /> */}
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

export default memo(WorkOrderItem);
