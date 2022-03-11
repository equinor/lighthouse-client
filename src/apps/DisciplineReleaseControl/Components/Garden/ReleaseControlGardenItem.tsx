import { ReleaseControlItem, MidSection, Title } from './GardenItemStyles';
import { Pipetest } from '../../Types/Pipetest';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';
import { getGardenItemColor } from './gardenFunctions';

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
            </ReleaseControlItem>
        </>
    );
}
