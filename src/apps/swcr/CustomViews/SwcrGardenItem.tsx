import { SwcrPackage } from '../models/SwcrPackage';
import { Item } from '../../../components/ParkView/Styles/item';
import styled from 'styled-components';
import { getSwcrStatusColor } from '../utilities/packages';
import { CustomItemView } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';

const SwcrItem = styled(Item)`
    background-color: ${(props) => props.color};
    width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
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

    return (
        <SwcrItem color={statusColor} onClick={onClick}>
            {data[itemKey]}
            {columnExpanded && <SwcrExpandedView data={data} />}
        </SwcrItem>
    );
}
