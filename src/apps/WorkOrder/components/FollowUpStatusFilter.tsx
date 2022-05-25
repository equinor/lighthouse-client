import { FollowUpStatuses } from '@equinor/GardenUtils';
import styled from 'styled-components';
import { followUpColorMap } from '../Garden/utility';

export const Container = styled.div`
    display: flex;
    justify-items: center;
`;

export const StatusColor = styled.div<{ color: string }>`
    margin: 0 4px;
    width: 10px;
    height: 12px;
    background-color: ${(props) => props.color};
`;

export const Title = styled.div`
    align-self: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
type FollowUpStatusFilterProps = {
    status: FollowUpStatuses;
};
export const FollowUpStatusFilter = ({ status }: FollowUpStatusFilterProps) => {
    return (
        <Container>
            <StatusColor color={followUpColorMap[status]} />
            <Title title={status}>{status}</Title>
        </Container>
    );
};
