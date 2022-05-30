import { memo, useMemo, useRef, useState } from 'react';
import { HandoverPackage } from '../../models/handoverPackage';
import { getDotsColor, getStatus, getTextColor, createProgressGradient } from '../../utility';
import { CustomItemView } from '../../../../../components/ParkView/Models/gardenOptions';
import { useParkViewContext } from '../../../../../components/ParkView/Context/ParkViewProvider';
import { PopoverContent, ItemOptions } from '../../components/HandoverItemPopover';
import { FlagIcon, WarningIcon } from '../../components/Icons';
import { Root, Sizes, ItemText, HandoverItemWrapper, StatusCircles } from './GardenItemStyles';
import { itemSize } from './utils';
import { PopoverWrapper } from '@equinor/GardenUtils';

function HandoverGardenItem({
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
}: CustomItemView<HandoverPackage>): JSX.Element {
    const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const { customState } = useParkViewContext();
    const size = itemSize(data.volume, (customState?.['maxVolume'] as number) || 0);

    const status = getStatus(data);
    const backgroundColor = useMemo(() => createProgressGradient(data, status), [data, status]);
    const textColor = getTextColor(status);

    const mcPackageColor = getDotsColor(data.mcStatus);
    const commStatusColor = getDotsColor(data.commpkgStatus);

    const showWarningIcon = false; // data.mcStatus === 'OS' && status === 'RFCC Accepted';

    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
    const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);

    const options: ItemOptions = {
        size,
        status,
        barColor: backgroundColor,
        textColor,
        mcPackageColor,
        commStatusColor,
        showWarningIcon,
    };
    return (
        <>
            <Root>
                <HandoverItemWrapper
                    ref={anchorRef}
                    onMouseEnter={() => {
                        hoverTimeout && !isOpen && clearTimeout(hoverTimeout);
                        setHoverTimeout(setTimeout(() => setIsOpen(true), 700));
                    }}
                    onMouseLeave={() => {
                        hoverTimeout && clearTimeout(hoverTimeout);
                        setIsOpen(false);
                    }}
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                    onClick={onClick}
                    style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
                    isSelected={isSelected}
                >
                    <Sizes size={size} color={textColor} />
                    {data.hasUnsignedActions && <FlagIcon color={textColor} />}
                    <ItemText>{data[itemKey]}</ItemText>
                    <StatusCircles mcColor={mcPackageColor} commColor={commStatusColor} />
                    {showWarningIcon && <WarningIcon />}
                </HandoverItemWrapper>

                {columnExpanded && data.description}
            </Root>

            {isOpen && (
                <PopoverWrapper
                    isOpen={isOpen}
                    rowStart={rowStart}
                    columnStart={columnStart}
                    width={itemWidth}
                    parentRef={parentRef}
                    popoverTitle={`Comm.pkg ${data.commpkgNo}`}
                >
                    <PopoverContent data={data} itemOptions={options} />
                </PopoverWrapper>
            )}
        </>
    );
}

export default memo(HandoverGardenItem);
