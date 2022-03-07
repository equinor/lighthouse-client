import { Popover } from '@equinor/eds-core-react';
import {
    FlagIcon,
    SizeIcons,
    PopoverProgressBar,
    PopoverContainer,
    PopoverStatus as StatusStyle,
} from '@equinor/GardenUtils';
import { memo } from 'react';
import { WorkOrder } from '../../models';
import { Statuses, HoldBy } from './styles';
type ItemSize = 'small' | 'medium' | 'large';

export type ItemOptions = {
    size: ItemSize;
    barColor: string;
    textColor: string;
    milestone: string;
    matStatus: string;
    matColor: string;
    mccrColor: string;
};
type WorkOrderPopoverProps = {
    data: WorkOrder;
    itemOptions: ItemOptions;
    anchorRef: React.RefObject<HTMLDivElement>;
    isOpen: boolean;
};
const WorkOrderPopoverWrapper = ({
    anchorRef,
    data,
    isOpen,
    itemOptions,
}: WorkOrderPopoverProps) => {
    const { barColor, textColor, milestone, size, matStatus, matColor, mccrColor } = itemOptions;
    return (
        <Popover id="hover-popover" anchorEl={anchorRef.current} open={isOpen} placement="bottom">
            <Popover.Title>{`Wo.Number: ${data.workOrderNumber}`}</Popover.Title>
            <Popover.Content>
                <PopoverContainer>
                    <p style={{ fontWeight: 'bold' }}>Project (ProCoSys)</p>
                    <p>
                        {data.projectIdentifier}, {data.projectDescription}
                    </p>
                    <p>{data.description}</p>
                    <hr />
                    <PopoverProgressBar barColor={barColor} textColor={textColor}>
                        <strong>Status: {milestone}</strong>

                        <div>
                            <SizeIcons size={size} color={textColor} />
                            <strong>
                                Volume: {data.estimatedHours} ({size})
                            </strong>
                        </div>
                    </PopoverProgressBar>
                    {data.holdBy && (
                        <HoldBy>
                            <FlagIcon color={'black'} /> Hold by
                        </HoldBy>
                    )}
                    <Statuses>
                        <h5>Material status</h5>
                        <StatusStyle color={matColor}>
                            {matStatus === 'NOT_AVAILABLE'
                                ? 'NA'
                                : matStatus === 'AVAILABLE'
                                ? 'AV'
                                : matStatus === 'OK'
                                ? 'OK'
                                : 'OS'}
                        </StatusStyle>
                        <h5>MCCR status</h5>
                        <StatusStyle color={mccrColor}>
                            {['OS', 'OK', 'PA'].includes(data.mccrStatus) ? data.mccrStatus : 'PB'}
                        </StatusStyle>
                    </Statuses>
                </PopoverContainer>
            </Popover.Content>
        </Popover>
    );
};

export const WorkOrderPopover = memo(WorkOrderPopoverWrapper);
