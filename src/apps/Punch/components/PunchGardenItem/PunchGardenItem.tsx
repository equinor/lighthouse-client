import { memo, useMemo, useRef } from 'react';
import { Punch } from '../../types';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';
import styled from 'styled-components';
import { getPunchStatusColors, getPunchStatusTextColors, getDotsColor } from './utils';
import { FlagIcon } from '../../components/icons/FlagIcon';

type PunchItemProps = { backgroundColor: string; textColor: string; isSelected: boolean };

const PunchItem = styled.div<PunchItemProps>`
    display: grid;
    grid-template-columns: 15px 3fr auto;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    background: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    cursor: pointer;
    height: 100%;
    border-radius: 5px;
    font-weight: 500;
    font-size: 13px;
    padding-left: 20px;
    padding-right: 2px;
    outline: ${(props) => (props.isSelected ? '2px dashed green' : '')};
    outline-offset: ${(props) => (props.isSelected ? '2px' : '')};
`;

const Root = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 5px;
    position: relative;
`;

const ItemText = styled.div`
    grid-column: 2/3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

type StatusCirclesProps = {
    typeColor: string;
};
const StatusCircles = styled.div<StatusCirclesProps>`
    display: flex;
    grid-column: 3/4;
    justify-content: end;
    align-items: center;

    ::before {
        width: 12px;
        height: 12px;
        border: 1px solid white;
        background-color: ${(props) => props.typeColor};
        border-radius: 50%;
        margin: 0px 1px;
        content: ' ';
    }
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
    const anchorRef = useRef<HTMLDivElement>(null);
    const punchTypeColor = getDotsColor(data.category);
    return (
        <Root>
            <PunchItem
                ref={anchorRef}
                style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
                backgroundColor={statusColor}
                textColor={textColor}
                onClick={onClick}
                isSelected={isSelected}
            >
                {data.materialRequired && <FlagIcon color={textColor} />}
                <ItemText>{data[itemKey]}</ItemText>
                <StatusCircles typeColor={punchTypeColor} />
            </PunchItem>
            {columnExpanded && <>{data.description}</>}
        </Root>
    );
}
export default memo(PunchGardenItem);
