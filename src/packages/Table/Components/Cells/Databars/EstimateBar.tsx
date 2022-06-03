import { useMemo } from 'react';
import styled from 'styled-components';
import { ActualProgress, ProgressBarContainer } from './ProgressBarContainer.styles';

interface EstimateBarProps {
    current: number;
    max: number;
}

export function EstimateBar({ current, max }: EstimateBarProps): JSX.Element {
    const percentage = useMemo(() => (max === 0 ? 0 : (current / max) * 100), [current, max]);

    return (
        <ProgressBarContainer>
            <ActualProgress borderColor="#0084C4" color="#CCE6F3" width={percentage} />
            <ProgressNumber>
                {parseFloat(Math.round(current).toString()).toLocaleString('no')}
            </ProgressNumber>
        </ProgressBarContainer>
    );
}

const ProgressNumber = styled.div`
    position: absolute;
    right: 5px;
    top: 0;
`;
