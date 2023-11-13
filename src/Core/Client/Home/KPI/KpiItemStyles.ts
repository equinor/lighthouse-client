import { Progress } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    flex: 1;

    :first-child {
        padding-left: 0;
    }
`;

export const StatusChipWrapper = styled.div`
    display: flex;
    margin-top: 0.5rem;
`;

interface StatusChipProps {
    background: string;
}

export const StatusChip = styled.div`
    background-color: ${({ background }: StatusChipProps) => background};
    height: 10px;
    width: 10px;
    margin-right: 0.5rem;
`;

interface ProgressBarProps {
    color: string;
    background: string;
}
export const ProgressBar = styled(Progress.Linear)`
    height: 10px;
    border-radius: 0;
    margin-top: 0.5rem;
    background-color: ${({ background }: ProgressBarProps) => background};

    > div {
        border-radius: 0;
        background-color: ${({ color }: ProgressBarProps) => color};
    }
`;
