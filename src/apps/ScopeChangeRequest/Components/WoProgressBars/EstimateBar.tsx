import styled from 'styled-components';
import { ActualProgress, ProgressBarContainer } from './ProgressBarContainer.styles';

interface EstimateBarProps {
    percentWidth: number;
    number?: number;
}

export function EstimateBar({ percentWidth, number }: EstimateBarProps): JSX.Element {
    return (
        <ProgressBarContainer>
            <ActualProgress borderColor="#0084C4" color="#CCE6F3" width={percentWidth} />
            <ProgressNumber>{number && Math.round(number)}</ProgressNumber>
        </ProgressBarContainer>
    );
}

const ProgressNumber = styled.div`
    position: absolute;
    right: 5px;
    top: 0;
`;
