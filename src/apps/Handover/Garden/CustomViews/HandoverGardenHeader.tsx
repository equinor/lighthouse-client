import { memo } from 'react';
import styled from 'styled-components';
import { CustomHeaderView } from '../../../../components/ParkView/Models/gardenOptions';
import { HandoverPackage } from '../models';
import { getStatus, statusPriorityMap } from '../utility';
const HeaderContent = styled.div`
    font-weight: 600;
`;
const getSubtitleHeader = (items: HandoverPackage[], groupByKey: string | undefined) => {
    const totalLength = items.length;
    const statusPriorities = items.map((commpkg) => statusPriorityMap[getStatus(commpkg)]);
    switch (groupByKey) {
        case 'RFCC':
            const rfcc = statusPriorities.filter(
                (priority) => priority <= statusPriorityMap['RFCC Accepted']
            ).length;
            return `RFCC ${rfcc}/${totalLength}`;

        case 'RFOC':
            const rfoc = statusPriorities.filter(
                (priority) => priority <= statusPriorityMap['RFOC Accepted']
            ).length;
            return `RFOC ${rfoc}/${totalLength}`;

        case 'TAC':
            const tac = items.filter((commpkg) => getStatus(commpkg) === 'TAC Accepted').length;
            return `TAC ${tac}/${totalLength}`;

        case 'DCC':
            const dcc = items.filter((commpkg) => getStatus(commpkg) === 'DCC Accepted').length;
            return `DCC ${dcc}/${totalLength}`;

        case 'RFRC':
            const rfrc = items.filter((commpkg) => getStatus(commpkg) === 'RFRC Accepted').length;
            return `RFRC ${rfrc}/${totalLength}`;

        default:
            const os = items.filter((commpkg) => getStatus(commpkg) === 'OS').length;
            return `OS ${os}/${totalLength}`;
    }
};
const HandoverGardenHeader = (props: CustomHeaderView<HandoverPackage>) => {
    const { columnIndex, garden } = props;
    const subHeader = getSubtitleHeader(garden[columnIndex].items, props?.groupByKey);
    return (
        <HeaderContent>
            {garden[columnIndex].value}
            <div>{subHeader}</div>
        </HeaderContent>
    );
};

export default memo(HandoverGardenHeader);
