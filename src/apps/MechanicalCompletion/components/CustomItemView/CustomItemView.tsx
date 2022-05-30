import { PopoverWrapper, statusColorMap } from '@equinor/GardenUtils';
import { CustomItemView, useParkViewContext } from '@equinor/ParkView';
import { memo, useMemo, useState } from 'react';
import { McPackage } from '../../types';
import { commStatusColors } from '../../utils/config/theme';
import { getItemContentsColor } from '../../utils/helpers/getItemContentsColor';
import { getCommissioningStatus } from '../../utils/helpers/getStatuses';
import { getTagSize } from '../../utils/helpers/getTagSize';
import { PopoverContent } from '../Popover/PopoverContent';
import { ItemText, McWrapper, Root, Sizes, StatusCircles } from './CustomItemView.styles';

const McGardenItem = ({
    data,
    itemKey,
    columnExpanded,
    onClick,
    isSelected,
    depth,
    columnStart,
    parentRef,
    rowStart,
    width: itemWidth = 300,
}: CustomItemView<McPackage>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

    const { customState } = useParkViewContext();

    const size = useMemo(
        () => getTagSize(data, (customState?.['averageTagVolume'] as number) || 0),
        [data, customState]
    );
    const status = useMemo(() => getCommissioningStatus(data), [data]);
    const backgroundColor = useMemo(() => commStatusColors[status], [status]);
    const contentsColor = useMemo(() => getItemContentsColor(status), [status]);
    const mcDotColor = useMemo(() => statusColorMap[data.mcStatus], [data.mcStatus]);
    const commDotColor = useMemo(() => statusColorMap[data.commPkgStatus], [data.commPkgStatus]);
    const width = useMemo(() => (depth ? 100 - depth * 3 : 97), [depth]);
    const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);
    const options = {
        status,
        backgroundColor,
        contentsColor,
        size,
        mcDotColor,
        commDotColor,
    };

    return (
        <>
            <Root>
                <McWrapper
                    onMouseEnter={() => {
                        hoverTimeout && !isOpen && clearTimeout(hoverTimeout);
                        setHoverTimeout(setTimeout(() => setIsOpen(true), 700));
                    }}
                    onMouseLeave={() => {
                        hoverTimeout && clearTimeout(hoverTimeout);
                        setIsOpen(false);
                    }}
                    onClick={onClick}
                    backgroundColor={backgroundColor}
                    textColor={contentsColor}
                    isSelected={isSelected}
                    style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
                >
                    <Sizes color={contentsColor} size={size} />
                    <ItemText> {data[itemKey]}</ItemText>

                    <StatusCircles mcColor={mcDotColor} commColor={commDotColor} />
                </McWrapper>
                {columnExpanded && data.description}
            </Root>
            {isOpen && (
                <PopoverWrapper
                    isOpen={isOpen}
                    width={itemWidth}
                    parentRef={parentRef}
                    rowStart={rowStart}
                    columnStart={columnStart}
                    popoverTitle={`Mc.pkg: ${data.mcPkgNumber}`}
                >
                    <PopoverContent data={data} options={options} />
                </PopoverWrapper>
            )}
        </>
    );
};

export default memo(McGardenItem);
