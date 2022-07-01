import { memo, useMemo } from 'react';
import { Punch } from '../../types';
import { ItemText, ItemWrapper, Root } from './gardenItemView.styles';
import { CustomItemView } from '@equinor/ParkView';
const GardenItemView = ({
    data,
    itemKey,
    onClick,
    columnExpanded,
    depth,
    width: itemWidth = 300,
    isSelected,
    rowStart,
    columnStart,
    parentRef,
}: CustomItemView<Punch>) => {
    const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
    const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);
    return (
        <Root>
            <ItemWrapper
                backgroundColor={'#d9e9f2'}
                onClick={onClick}
                style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
                isSelected={isSelected}
            >
                <ItemText>{(data[itemKey] as string).replace('@LOOP-', '')}</ItemText>
            </ItemWrapper>

            {columnExpanded && data.description}
        </Root>
    );
};

export const CustomGardenItem = memo(GardenItemView);
