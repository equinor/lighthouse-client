import { SwcrPackage } from '../models/SwcrPackage';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { getSwcrStatusColor } from '../utilities/packages';
import { CustomItemView } from '../../../components/ParkView/Models/gardenOptions';
import { memo, useMemo } from 'react';

type SwcrItemProps = { backgroundColor: string; textColor: string };

const SwcrItem = styled.div<SwcrItemProps>`
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 100%;
`;

const Root = styled.div`
    height: 85%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 5px;
`;

function SwcrItemView({
    data,
    itemKey,
    onClick,
    columnExpanded,
    width: itemWidth = 300,
    depth,
}: CustomItemView<SwcrPackage>): JSX.Element {
    const statusColor = getSwcrStatusColor(data.status);
    const textColor = ['Closed - Rejected', 'Closed'].includes(data.status)
        ? tokens.colors.text.static_icons__primary_white.rgba
        : tokens.colors.text.static_icons__default.rgba;
    const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
    const maxWidth = useMemo(() => itemWidth * 0.95, [itemWidth]);
    return (
        <Root>
            <SwcrItem
                style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
                backgroundColor={statusColor}
                textColor={textColor}
                onClick={onClick}
            >
                {data[itemKey]}
            </SwcrItem>
            {columnExpanded && (
                <>
                    {data.title}{' '}
                    {parseInt(data.estimatedManhours) > 0 ? `(${data.estimatedManhours}h)` : ''}
                </>
            )}
        </Root>
    );
}
export default memo(SwcrItemView);
