import {
    ReleaseControlItem,
    MidSection,
    Title,
    Circles,
    ReleaseControlExpanded,
    ReleaseControlExpandedTitle,
} from './GardenItemStyles';
import { Pipetest } from '../../Types/pipetest';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';
import { getGardenItemColor, getGardenItemCompletionColor } from './gardenFunctions';
import { StatusCircle } from './StatusCircle';
import { useParkViewContext } from '../../../../components/ParkView/Context/ParkViewProvider';

export function ReleaseControlExpandedView({ data }: { data: Pipetest }): JSX.Element {
    return (
        <ReleaseControlExpanded>
            <ReleaseControlExpandedTitle>{data.description}</ReleaseControlExpandedTitle>
        </ReleaseControlExpanded>
    );
}

export function ReleaseControlGardenItem({
    data,
    itemKey,
    onClick,
    columnExpanded,
}: CustomItemView<Pipetest>): JSX.Element {
    const { groupByKeys } = useParkViewContext();

    return (
        <>
            <ReleaseControlItem
                backgroundColor={getGardenItemColor(data)}
                textColor={'#000'}
                isGrouped={groupByKeys.length > 0}
                onClick={onClick}
                isExpanded={columnExpanded}
            >
                <MidSection expanded={columnExpanded}>
                    <Title>{data[itemKey]}</Title>
                    {columnExpanded && <ReleaseControlExpandedView data={data} />}
                </MidSection>
                <Circles>
                    <StatusCircle statusColor={getGardenItemCompletionColor(data)} />
                </Circles>
            </ReleaseControlItem>
        </>
    );
}
