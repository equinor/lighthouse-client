import {
    ReleaseControlItem,
    MidSection,
    Title,
    Icons,
    ReleaseControlExpanded,
    ReleaseControlExpandedTitle,
} from './GardenItemStyles';
import { Pipetest } from '../../Types/pipetest';
import { CustomItemView } from '@equinor/ParkView';
import {
    getGardenContentColor,
    getGardenItemColor,
    getGardenItemCompletionColor,
} from './gardenFunctions';
import { useParkViewContext } from '@equinor/ParkView';
import { memo } from 'react';
import { WorkflowWarningTriangle } from '../Workflow/Components/WorkflowWarningTriangle';
import { StatusCircle } from '@equinor/GardenUtils';
import { WarningTriangleContainer } from '../Workflow/Styles/styles';

export function ReleaseControlExpandedView({ data }: { data: Pipetest }): JSX.Element {
    return (
        <ReleaseControlExpanded>
            <ReleaseControlExpandedTitle>{data.description}</ReleaseControlExpandedTitle>
        </ReleaseControlExpanded>
    );
}
const ReleaseControlGardenItem = ({
    data,
    itemKey,
    onClick,
    columnExpanded,
}: CustomItemView<Pipetest>) => {
    const { groupByKeys } = useParkViewContext();
    const contentColor = getGardenContentColor(data.step);

    return (
        <>
            <ReleaseControlItem
                backgroundColor={getGardenItemColor(data.step)}
                textColor={contentColor}
                isGrouped={groupByKeys.length > 0}
                onClick={onClick}
                isExpanded={columnExpanded}
            >
                <MidSection expanded={columnExpanded}>
                    <Title>{data[itemKey]}</Title>
                    {columnExpanded && <ReleaseControlExpandedView data={data} />}
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
        </>
    );
};

export default memo(ReleaseControlGardenItem);
