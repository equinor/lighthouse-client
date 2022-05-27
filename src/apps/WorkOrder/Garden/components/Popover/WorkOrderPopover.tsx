import {
    FlagIcon,
    SizeIcons,
    PopoverProgressBar,
    PopoverContainer,
    PopoverStatus as StatusStyle,
} from '@equinor/GardenUtils';
import { memo } from 'react';
import { WorkOrder } from '../../models';
import { Statuses, HoldBy, ProjectTitle, ProjectDescription } from './styles';
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
};
const WorkOrderPopoverWrapper = ({ data, itemOptions }: WorkOrderPopoverProps) => {
    const { barColor, textColor, milestone, size, matStatus, matColor, mccrColor } = itemOptions;
    return (
        <PopoverContainer>
            <ProjectTitle>Project (ProCoSys)</ProjectTitle>
            <p>
                {data.projectIdentifier}, {data.projectDescription}
            </p>
            <ProjectDescription>{data.description}</ProjectDescription>
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
                    {['OS', 'OK', 'PA'].includes(data.mccrStatus || '') ? data.mccrStatus : 'PB'}
                </StatusStyle>
            </Statuses>
        </PopoverContainer>
    );
};

export const WorkOrderPopover = memo(WorkOrderPopoverWrapper);
