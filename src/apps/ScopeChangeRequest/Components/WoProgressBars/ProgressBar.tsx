import {
    ActualProgress,
    ProgressBarContainer,
    ProgressBarPercent,
} from './ProgressBarContainer.styles';

interface ProgressBarProps {
    percentWidth: number;
    number?: string;
}

export function ProgressBar({ percentWidth }: ProgressBarProps): JSX.Element {
    return (
        <ProgressBarContainer>
            <ActualProgress borderColor="#40D38F" width={percentWidth} color="#D9F6E9">
                <ProgressBarPercent>{`${Math.round(percentWidth)}%`}</ProgressBarPercent>
            </ActualProgress>
        </ProgressBarContainer>
    );
}
