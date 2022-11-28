import { memo, useMemo } from 'react';
import { Punch } from '../../types';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';
import styled from 'styled-components';
import { getPunchStatusColors, getPunchStatusTextColors } from './utils';

type PunchItemProps = { backgroundColor: string; textColor: string; isSelected: boolean };

const PunchItem = styled.div<PunchItemProps>`
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

function PunchGardenItem({
    data,
    itemKey,
    onClick,
    columnExpanded,
    width: itemWidth = 300,
    depth,
    isSelected,
}: CustomItemView<Punch>): JSX.Element {
    const statusColor = getPunchStatusColors(data.status);
    const textColor = getPunchStatusTextColors(data.status);
    const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
    const maxWidth = useMemo(() => itemWidth * 0.95, [itemWidth]);
    return (
        <Root>
            <PunchItem
                style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
                backgroundColor={statusColor}
                textColor={textColor}
                onClick={onClick}
                isSelected={isSelected}
            >
                {data[itemKey]}
            </PunchItem>
            {columnExpanded && <>{data.description}</>}
        </Root>
    );
}
export default memo(PunchGardenItem);
