import styled from 'styled-components';
import { SwcrStatus } from '../models/SwcrPackage';
import { getSwcrStatusColor } from '../utilities/packages';

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
    status: SwcrStatus;
};
export const StatusFilter = ({ status }: StatusFilterProps) => {
    return (
        <Container>
            <StatusColor color={getSwcrStatusColor(status)}></StatusColor>
            <Title>{status}</Title>
        </Container>
    );
};
