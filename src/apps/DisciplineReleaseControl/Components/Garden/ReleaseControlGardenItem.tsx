import { ReleaseControlItem, MidSection, Title, Icons, Root } from './GardenItemStyles';
import { Pipetest } from '../../Types/pipetest';
import { CustomItemView } from '@equinor/ParkView';
import {
    getGardenContentColor,
    getGardenItemColor,
    getGardenItemCompletionColor,
} from '../../utils/helpers/gardenFunctions';
import { useParkViewContext } from '@equinor/ParkView';
import { memo } from 'react';
import { WorkflowWarningTriangle } from '../Workflow/Components/WorkflowWarningTriangle';
import { StatusCircle } from '@equinor/GardenUtils';
import { WarningTriangleContainer } from '../Workflow/Styles/styles';

const ReleaseControlGardenItem = ({
    data,
    itemKey,
    onClick,
    columnExpanded,
    isSelected,
}: CustomItemView<Pipetest>) => {
    const { groupByKeys } = useParkViewContext();
    const contentColor = getGardenContentColor(data.step);

    return (
        <Root>
            <ReleaseControlItem
                isSelected={isSelected}
                backgroundColor={getGardenItemColor(data.step)}
                textColor={contentColor}
                isGrouped={groupByKeys.length > 0}
                onClick={onClick}
                isExpanded={columnExpanded}
            >
                <MidSection expanded={columnExpanded}>
                    <Title>{data[itemKey]}</Title>
                </MidSection>
                <Icons>
                    {!data.pipetestProcessDoneInRightOrder ? (
                        <WorkflowWarningTriangle color={contentColor} />
                    ) : (
                        <WarningTriangleContainer />
                    )}
                    <StatusCircle
                        statusColor={getGardenItemCompletionColor(data.completionStatus)}
                    />
                </Icons>
            </ReleaseControlItem>
            {columnExpanded && data.description}
        </Root>
    );
};

export default memo(ReleaseControlGardenItem);
