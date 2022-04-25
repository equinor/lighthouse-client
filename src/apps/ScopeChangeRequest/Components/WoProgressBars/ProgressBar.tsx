import styled from 'styled-components';
import { ActualProgress, ProgressBarContainer } from './ProgressBarContainer.styles';

interface ProgressBarProps {
    percentWidth: number;
    number?: string;
}

export function ProgressBar({ percentWidth }: ProgressBarProps): JSX.Element {
    return (
        <ProgressBarContainer>
            <ActualProgress
                borderColor="#40D38F"
                width={percentWidth}
                color="#D9F6E9"
            ></ActualProgress>
            <ProgressNumber style={{ right: 5 }}>{`${Math.round(percentWidth)}%`}</ProgressNumber>
        </ProgressBarContainer>
    );
}

const ProgressNumber = styled.div`
    position: absolute;
    right: 5;
    top: 0;
`;
