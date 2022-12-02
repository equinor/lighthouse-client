import styled from 'styled-components';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';
import { memo, useMemo } from 'react';
import { tokens } from '@equinor/eds-tokens';
import { Query } from '../../types';
import { getQueryStatusColor } from '../../utility/helpers';

type QueryItemProps = { backgroundColor: string; textColor: string; isSelected: boolean };

const QueryItem = styled.div<QueryItemProps>`
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 100%;
    outline: ${(props) => (props.isSelected ? '2px dashed green' : '')};
    outline-offset: ${(props) => (props.isSelected ? '2px' : '')};
`;

const Root = styled.div`
    height: 85%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 5px;
`;

function QueryGardenItem({
    data,
    itemKey,
    onClick,
    columnExpanded,
    width: itemWidth = 300,
    depth,
    isSelected,
}: CustomItemView<Query>): JSX.Element {
    const statusColor = getQueryStatusColor(data.queryStatus);
    const textColor = ['Closed'].includes(data.queryStatus)
        ? tokens.colors.text.static_icons__primary_white.rgba
        : tokens.colors.text.static_icons__default.rgba;
    const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
    const maxWidth = useMemo(() => itemWidth * 0.95, [itemWidth]);
    return (
        <Root>
            <QueryItem
                style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
                backgroundColor={statusColor}
                textColor={textColor}
                onClick={onClick}
                isSelected={isSelected}
            >
                {data[itemKey]}
            </QueryItem>
            {columnExpanded && <>{data.title} </>}
        </Root>
    );
}
export const CustomGardenItem = memo(QueryGardenItem);
