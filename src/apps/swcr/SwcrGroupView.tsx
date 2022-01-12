import { SwcrPackage } from './SwcrPackage';
import { Pack } from '../../components/ParkView/Styles/group';
import styled from 'styled-components';
//import { DataSet } from '../../components/ParkView/Models/data';
import { Count } from '../../components/ParkView/Styles/common';
import { ChevronUp, ChevronDown } from '../../components/ParkView/Icons/Chevron';
import { CustomGroupView } from '../../Core/WorkSpace/src/WorkSpaceApi/State';

/* interface SwcrGroupViewProps {
    data: DataSet<SwcrPackage>;
    onClick: () => void;
} */

const SwcrGroup = styled(Pack)`
    max-width: 240px;
`;

const Title = styled.div`
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Chevron = styled.div`
    min-width: 24px;
`;

export function SwcrGroupView({ data, onClick }: CustomGroupView<SwcrPackage>): JSX.Element {
    return (
        <SwcrGroup key={data.value + data.groupKey} onClick={onClick}>
            {data.status?.statusElement}
            <Title> {data.value} </Title>
            <Count>({data.count})</Count>
            <Chevron>{data.isExpanded ? <ChevronUp /> : <ChevronDown />}</Chevron>
        </SwcrGroup>
    );
}
