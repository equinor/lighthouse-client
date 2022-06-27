import { memo, useMemo, useRef, useState } from 'react';
import { PopoverWrapper, statusColorMap } from '@equinor/GardenUtils';
import { Loop } from '../../types';
import { CustomItemView } from '@equinor/ParkView';
import { ItemText, ItemWrapper, Root, StatusCircles } from './customGardenItem.styles';
import { PopoverContent } from '../Popover';
const createProgressBackground = (progress: number) => {
    const standardColor = '#ffffff';
    return `linear-gradient(90deg, #d9eaf2 ${progress}%, ${standardColor} ${progress}%)`;
};
function CustomGardenItem({
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
}: CustomItemView<Loop>): JSX.Element {
    const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
    const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);

    const linear = createProgressBackground((data.loopContentProgress ?? 0) * 100);
    return (
        <>
            <Root>
                <ItemWrapper
                    ref={anchorRef}
                    onMouseEnter={() => {
                        hoverTimeout && !isOpen && clearTimeout(hoverTimeout);
                        setHoverTimeout(setTimeout(() => setIsOpen(true), 700));
                    }}
                    onMouseLeave={() => {
                        hoverTimeout && clearTimeout(hoverTimeout);
                        setIsOpen(false);
                    }}
                    backgroundColor={linear}
                    onClick={onClick}
                    style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
                    isSelected={isSelected}
                >
                    <ItemText>{(data[itemKey] as string).replace('@LOOP-', '')}</ItemText>
                    <StatusCircles
                        mcColor={
                            data.loopContentStatus ? statusColorMap[data.loopContentStatus] : null
                        }
                        commColor={data.status ? statusColorMap[data.status] : null}
                    />
                </ItemWrapper>

                {columnExpanded && data.description}
            </Root>

            {isOpen && (
                <PopoverWrapper
                    isOpen={isOpen}
                    rowStart={rowStart}
                    columnStart={columnStart}
                    width={itemWidth}
                    parentRef={parentRef}
                    popoverTitle={`${data.loopNo}`}
                >
                    <PopoverContent loop={data} />
                </PopoverWrapper>
            )}
        </>
    );
}

export const CustomGardenView = memo(CustomGardenItem);
