import { useMemo, useRef, useState } from 'react';
import { HandoverPackage } from '../../models/handoverPackage';
import { getDotsColor, getStatus, getTextColor, createProgressGradient } from '../../utility';
import { CustomItemView } from '../../../../../components/ParkView/Models/gardenOptions';
import { useParkViewContext } from '../../../../../components/ParkView/Context/ParkViewProvider';
import { HandoverItemPopover, ItemOptions } from '../../components/HandoverItemPopover';
import { SizeIcons, FlagIcon, StatusCircle, WarningIcon } from '../../components/Icons';
import {
    HandoverExpanded,
    HandoverExpandedTitle,
    HandoverItem,
    Circles,
    Icons,
    MidSection,
    Title,
} from './GardenItemStyles';
import { itemSize } from './utils';

export function HandoverExpandedView({ data }: { data: HandoverPackage }): JSX.Element {
    return (
        <HandoverExpanded>
            <HandoverExpandedTitle>{data.description}</HandoverExpandedTitle>
        </HandoverExpanded>
    );
}

export function HandoverGardenItem({
    data,
    itemKey,
    onClick,
    columnExpanded,
}: CustomItemView<HandoverPackage>): JSX.Element {
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

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

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
            <HandoverItem
                ref={anchorRef}
                onMouseOver={onOpen}
                onMouseLeave={onClose}
                backgroundColor={backgroundColor}
                textColor={textColor}
                onClick={onClick}
                isExpanded={columnExpanded}
            >
                <Icons>
                    <SizeIcons size={size} status={status} />
                    {data.hasUnsignedActions && <FlagIcon color={textColor} />}
                </Icons>
                <MidSection expanded={columnExpanded}>
                    <Title>{data[itemKey]}</Title>
                    {columnExpanded && <HandoverExpandedView data={data} />}
                </MidSection>
                <Circles>
                    <StatusCircle statusColor={mcPackageColor} />
                    <StatusCircle statusColor={commStatusColor} />
                </Circles>
                {showWarningIcon && <WarningIcon />}
            </HandoverItem>
            {isOpen && (
                <HandoverItemPopover
                    data={data}
                    itemOptions={options}
                    anchorRef={anchorRef}
                    setOpenState={setIsOpen}
                    isOpen={isOpen}
                />
            )}
        </>
    );
}
