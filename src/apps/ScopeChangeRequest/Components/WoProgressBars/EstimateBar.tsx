import {
    ActualProgress,
    ProgressBarContainer,
    ProgressBarPercent,
} from './ProgressBarContainer.styles';

interface EstimateBarProps {
    percentWidth: number;
    number?: number;
}

export function EstimateBar({ percentWidth, number }: EstimateBarProps): JSX.Element {
    return (
        <ProgressBarContainer>
            <ActualProgress borderColor="#0084C4" color="#CCE6F3" width={percentWidth}>
                <ProgressBarPercent style={{ textAlign: 'right' }}>
                    {number && Math.round(number)}
                </ProgressBarPercent>
            </ActualProgress>
        </ProgressBarContainer>
    );
}
