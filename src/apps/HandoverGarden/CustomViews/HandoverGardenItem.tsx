import { useMemo } from 'react';
import styled from 'styled-components';
import { Item } from '../../../components/ParkView/Styles/item';
import { HandoverPackage } from '../models/HandoverPackage';
import { getStatus, getTextColor } from '../utility/handoverItemMapping';
import { CustomItemView } from '../../../components/ParkView/Models/gardenOptions';
import { createProgressGradient } from '../utility/mcProgress';
import { SizeIconsHtml } from '../components/SizeIcons';

type HandoverItemProps = { backgroundColor: string; textColor: string };

const HandoverItem = styled(Item)<HandoverItemProps>`
    display: flex;

    background: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    width: 100%;
    min-width: 150px;
    box-sizing: border-box;
    white-space: nowrap;
    justify-content: space-evenly;
`;

const HandoverExpanded = styled.div`
    display: flex;
    flex: 1;
`;

const HandoverExpandedTitle = styled.div`
    display: flex;
    flex: 1;
    padding: 0 1rem;
`;

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
    const status = getStatus(data);
    const backgroundColor = useMemo(() => createProgressGradient(data, status), [data, status]);

    return (
        <HandoverItem
            backgroundColor={backgroundColor}
            textColor={getTextColor(status)}
            onClick={onClick}
        >
            <div>
                <SizeIconsHtml size={'medium'} status={status} />
            </div>
            <div>
                {data[itemKey]}
                {columnExpanded && <HandoverExpandedView data={data} />}
            </div>
            <div></div>
        </HandoverItem>
    );
}
