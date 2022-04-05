import {
    ReleaseControlItem,
    MidSection,
    Title,
    Icons,
    ReleaseControlExpanded,
    ReleaseControlExpandedTitle,
} from './GardenItemStyles';
import { Pipetest } from '../../Types/pipetest';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';
import { getGardenItemColor, getGardenItemCompletionColor } from './gardenFunctions';
import { StatusCircle } from './StatusCircle';
import { useParkViewContext } from '../../../../components/ParkView/Context/ParkViewProvider';
import { memo } from 'react';
import { WorkflowWarningTriangle } from '../Workflow/Components/WorkflowWarningTriangle';

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

    return (
        <>
            <ReleaseControlItem
                backgroundColor={getGardenItemColor(data.step)}
                textColor={'#000'}
                isGrouped={groupByKeys.length > 0}
                onClick={onClick}
                isExpanded={columnExpanded}
            >
                <MidSection expanded={columnExpanded}>
                    <Title>{data[itemKey]}</Title>
                    {columnExpanded && <ReleaseControlExpandedView data={data} />}
                </MidSection>
                <Icons>
                    {!data.pipetestProcessDoneInRightOrder && (
                        <WorkflowWarningTriangle outline={true} />
                    )}
                    <StatusCircle statusColor={getGardenItemCompletionColor(data)} />
                </Icons>
            </ReleaseControlItem>
        </>
    );
};

export default memo(ReleaseControlGardenItem);
