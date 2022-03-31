import { SwcrPackage } from '../models/SwcrPackage';
import { Item } from '../../../components/ParkView/Styles/item';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { getSwcrStatusColor } from '../utilities/packages';
import { CustomItemView } from '../../../components/ParkView/Models/gardenOptions';
import { memo } from 'react';

type SwcrItemProps = { backgroundColor: string; textColor: string };

const SwcrItem = styled.div<SwcrItemProps>`
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    width: 95%;
    min-width: 150px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
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
export const Root = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 5px;
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

function SwcrItemView({
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
        <Root>
            <SwcrItem backgroundColor={statusColor} textColor={textColor} onClick={onClick}>
                {data[itemKey]}
                {/* {columnExpanded && <SwcrExpandedView data={data} />} */}
            </SwcrItem>
        </Root>
    );
}
export default memo(SwcrItemView);
