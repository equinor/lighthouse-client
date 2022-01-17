import { SwcrPackage } from '../models/SwcrPackage';
import { Item } from '../../../components/ParkView/Styles/item';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { getSwcrStatusColor } from '../utilities/packages';
import { CustomItemView } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';

type SwcrItemProps = { backgroundColor: string; textColor: string };

const SwcrItem = styled(Item)<SwcrItemProps>`
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    width: 100%;
    min-width: 150px;
    box-sizing: border-box;
    white-space: nowrap;
    justify-content: center;
`;

const SwcrExpanded = styled.div`
    display: flex;
    flex: 1;
`;

const SwcrExpandedTitle = styled.div`
    display: flex;
    flex: 1;
    padding: 0 1rem;
`;

const SwcrExpandedHours = styled.div`
    display: flex;
`;

export function SwcrExpandedView({ data }: { data: SwcrPackage }): JSX.Element {
    return (
        <SwcrExpanded>
            <SwcrExpandedTitle>{data.title}</SwcrExpandedTitle>
            <SwcrExpandedHours>
                {parseInt(data.estimatedManhours) > 0 ? `(${data.estimatedManhours}h)` : ''}
            </SwcrExpandedHours>
        </SwcrExpanded>
    );
}

export function SwcrItemView({
    data,
    itemKey,
    onClick,
    columnExpanded,
}: CustomItemView<SwcrPackage>): JSX.Element {
    const statusColor = getSwcrStatusColor(data.status);
    const textColor = ['Closed - Rejected', 'Closed'].includes(data.status)
        ? tokens.colors.text.static_icons__primary_white.rgba
        : tokens.colors.text.static_icons__default.rgba;

    return (
        <SwcrItem backgroundColor={statusColor} textColor={textColor} onClick={onClick}>
            {data[itemKey]}
            {columnExpanded && <SwcrExpandedView data={data} />}
        </SwcrItem>
    );
}

/* 
    import { useState } from 'react';

    const SwcrItem = styled(Item)`
    background-color: ${(props) => props.color};
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    padding: 0.25rem 1rem;
    border: none;
`;
export function SwcrExtendedInfoView({ data }: { data: SwcrPackage }): JSX.Element {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{data.modification}</pre>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{data.description}</pre>
        </div>
    );
}

export function SwcrItemView({
    data,
    itemKey,
    onClick,
    columnExpanded,
}: CustomItemView<SwcrPackage>): JSX.Element {
    const statusColor = getSwcrStatusColor(data.status);
    const [open, setOpen] = useState(false);

    return (
        <SwcrItem color={statusColor} onClick={() => setOpen((prevState) => !prevState)}>
            <div style={{ display: 'flex' }}>
                {data[itemKey]}
                {columnExpanded && <SwcrExpandedView data={data} />}
            </div>
            {open && <SwcrExtendedInfoView data={data} />}
        </SwcrItem>
    );
} */
