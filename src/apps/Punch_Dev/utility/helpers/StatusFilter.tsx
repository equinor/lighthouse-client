import styled from 'styled-components';
import { PunchStatus } from '../../types';
import { getPunchStatusColors } from '../../components/PunchGardenItem/utils';

const Container = styled.div`
    display: flex;
    justify-items: center;
`;
const StatusColor = styled.div<{ color: string }>`
    margin: 0 4px;
    width: 10px;
    height: 12px;
    background-color: ${(props) => props.color};
`;

const Title = styled.div`
    align-self: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
type StatusFilterProps = {
    status: PunchStatus;
};
export const StatusFilter = ({ status }: StatusFilterProps) => {
    return (
        <Container>
            <StatusColor color={getPunchStatusColors(status)}></StatusColor>
            <Title>{status}</Title>
        </Container>
    );
};
