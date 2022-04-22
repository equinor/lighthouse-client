import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { CustomHeaderView } from '../../../../../components/ParkView/Models/gardenOptions';
import { WorkOrder } from '../../models';
import { getSubtitleHeader } from '../../utility/getSubtitleHeader';
const HeaderContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 600;
`;
const Count = styled.span`
    color: #000000;
    font-weight: 300;
    font-size: 0.8rem;
    margin-left: 0.8em;
`;
const WorkOrderHeader = (props: CustomHeaderView<WorkOrder>) => {
    const { columnIndex, garden, columnIsExpanded } = props;
    const subtitleHeader = useMemo(
        () => getSubtitleHeader(garden, columnIndex, columnIsExpanded, props?.groupByKey),
        [garden, columnIndex, columnIsExpanded, props?.groupByKey]
    );

    return (
        <HeaderContent>
            <div>
                {garden[columnIndex].value}
                <div>{subtitleHeader}</div>
            </div>
            <Count>({garden[columnIndex].count})</Count>
        </HeaderContent>
    );
};

export default memo(WorkOrderHeader);
