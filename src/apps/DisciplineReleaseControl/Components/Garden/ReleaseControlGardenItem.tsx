import { ReleaseControlItem, MidSection, Title, Circles } from './GardenItemStyles';
import { Pipetest } from '../../Types/pipetest';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';
import { getGardenItemColor, getGardenItemCompletionColor } from './gardenFunctions';
import { StatusCircle } from './StatusCircle';

export function ReleaseControlGardenItem({
    data,
    itemKey,
    onClick,
}: CustomItemView<Pipetest>): JSX.Element {
    const backgroundColor = getGardenItemColor(data);
    const textColor = '#000';

    return (
        <>
            <ReleaseControlItem
                backgroundColor={backgroundColor}
                textColor={textColor}
                onClick={onClick}
            >
                <MidSection>
                    <Title>{data[itemKey]}</Title>
                </MidSection>
                <Circles>
                    <StatusCircle statusColor={getGardenItemCompletionColor(data)} />
                </Circles>
            </ReleaseControlItem>
        </>
    );
}
