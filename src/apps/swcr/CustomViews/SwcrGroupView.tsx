import { SwcrPackage } from '../models/SwcrPackage';
import { Pack } from '../../../components/ParkView/Styles/group';
import styled from 'styled-components';
import { Count } from '../../../components/ParkView/Styles/common';
import { ChevronUp, ChevronDown } from '../../../components/ParkView/Icons/Chevron';
import { CustomGroupView } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';

const SwcrGroup = styled(Pack)``;

const Title = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const GroupText = styled.div`
    display: flex;
`;

const Chevron = styled.div`
    min-width: 24px;
`;

export function SwcrGroupView({ data, onClick }: CustomGroupView<SwcrPackage>): JSX.Element {
    return (
        <SwcrGroup key={data.value + data.groupKey} onClick={onClick}>
            {data.status?.statusElement}
            <GroupText>
                <Title> {data.value} </Title>
                <Count>({data.count})</Count>
            </GroupText>
            <Chevron>{data.isExpanded ? <ChevronUp /> : <ChevronDown />}</Chevron>
        </SwcrGroup>
    );
}
