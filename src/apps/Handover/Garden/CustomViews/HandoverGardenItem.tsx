import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Item } from '../../../../components/ParkView/Styles/item';
import { HandoverPackage } from '../models/HandoverPackage';
import { getDotsColor, getStatus, getTextColor } from '../utility/handoverItemMapping';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';
import { createProgressGradient } from '../utility/mcProgress';
import { SizeIcons } from '../components/SizeIcons';
import { StatusCircle } from '../components/StatusCircle';
import { FlagIcon } from '../components/FlagIcon';
import { WarningIcon } from '../components/WarningIcon';
import { useParkViewContext } from '../../../../components/ParkView/Context/ParkViewProvider';
import { HandoverItemPopover, ItemOptions } from '../components/HandoverItemPopover';

type HandoverItemProps = { backgroundColor: string; textColor: string };

const HandoverItem = styled(Item)<HandoverItemProps>`
    display: flex;
    background: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    width: 100%;
    min-width: 150px;
    box-sizing: border-box;
    white-space: nowrap;
    justify-content: space-between;
`;

const MidSection = styled.div<{ expanded: boolean }>`
    display: flex;
    justify-content: ${(props) => (props.expanded ? 'flex-start' : 'center')};
    flex: 1;
`;

const Icons = styled.div`
    display: flex;
`;

const Title = styled.div`
    padding: 0px 8px;
`;

const HandoverExpanded = styled.div`
    display: flex;
    flex: 1;
`;

const HandoverExpandedTitle = styled.div`
    display: flex;
    flex: 1;
    padding-right: 8px;
`;

const Circles = styled.div`
    display: flex;
    padding-right: 0px 8px;
`;

export function HandoverExpandedView({ data }: { data: HandoverPackage }): JSX.Element {
    return (
        <HandoverExpanded>
            <HandoverExpandedTitle>{data.description}</HandoverExpandedTitle>
        </HandoverExpanded>
    );
}

const itemSize = (volume: number, maxVolume: number) => {
    if (maxVolume <= 0) return 'small';
    const percentage = (volume / maxVolume) * 100;
    return percentage > 66 ? 'large' : percentage > 33 ? 'medium' : 'small';
};

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
            >
                <Icons>
                    <SizeIcons size={size} status={status} />
                    <FlagIcon color={textColor} />
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
