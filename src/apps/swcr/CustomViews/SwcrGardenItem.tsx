import { SwcrPackage } from '../models/SwcrPackage';
import { Item } from '../../../components/ParkView/Styles/item';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { getSwcrStatusColor } from '../utilities/packages';
import { CustomItemView } from '../../../components/ParkView/Models/gardenOptions';

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
