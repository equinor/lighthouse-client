import { useMemo } from 'react';
import styled from 'styled-components';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';

interface StatsProps {
    requests: ScopeChangeRequest[];
}

export const Stats = ({ requests }: StatsProps): JSX.Element => {
    const activeRequests: number = useMemo(() => {
        return requests.filter((x) => x.state === 'Open').length;
    }, [requests]);

    const countRequests: number = useMemo(() => {
        return requests.length;
    }, [requests]);

    const mhrsIncrease: number = useMemo(() => {
        let totalCount = 0;
        requests.forEach((request) => {
            totalCount += request.guesstimateHrs;
        });
        return totalCount;
    }, [requests]);

    return (
        <StatsBox>
            <StatsLine>
                <Bold>{countRequests}</Bold>
                <StatsText>Requests</StatsText>
            </StatsLine>
            <StatsLine>
                <Bold>{activeRequests}</Bold>
                <StatsText>Requests open</StatsText>
            </StatsLine>
            <StatsLine>
                <Bold style={{ color: 'red' }}>8</Bold>
                <StatsText>Overdue</StatsText>
            </StatsLine>
            <StatsLine>
                <Bold style={{ color: 'red' }}>3</Bold>
                <StatsText>Last 7 days</StatsText>
            </StatsLine>
            <StatsLine>
                <Bold>{mhrsIncrease}</Bold>
                <StatsText>Mhrs increase (guesstimate)</StatsText>
            </StatsLine>
        </StatsBox>
    );
};

const StatsLine = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1em;
`;

const Bold = styled.div`
    font-weight: bold;
    font-size: x-large;
    margin-bottom: 0.3em;
`;

const StatsText = styled.div`
    opacity: 0.5;
`;

const StatsBox = styled.div`
    display: flex;
`;
