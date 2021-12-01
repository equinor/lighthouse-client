import styled from 'styled-components';

export const Stats = (): JSX.Element => {
    return (
        <StatsBox>
            <StatsLine>
                <Bold>132</Bold>
                <StatsText>Requests</StatsText>
            </StatsLine>
            <StatsLine>
                <Bold>14</Bold>
                <StatsText>Requests open</StatsText>
            </StatsLine>
            <StatsLine>
                <Bold>8</Bold>
                <StatsText>Overdue</StatsText>
            </StatsLine>
            <StatsLine>
                <Bold>3</Bold>
                <StatsText>Last 7 days</StatsText>
            </StatsLine>
            <StatsLine>
                <Bold>220,492</Bold>
                <StatsText>Mhrs increase</StatsText>
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
