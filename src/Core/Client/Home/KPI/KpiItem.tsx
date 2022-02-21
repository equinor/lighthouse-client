import { Typography } from '@equinor/eds-core-react';
import { ProgressBar, StatusChip, StatusChipWrapper, Wrapper } from './KpiItemStyles';

export interface KpiProgressItem {
    type: 'ProgressItem';
    value: string;
    description: string;
    progress: number;
    progressColor: () => { progress: string; progressBg: string };
}

export const KpiProgress = ({
    value,
    description,
    progress,
    progressColor,
}: KpiProgressItem): JSX.Element => {
    return (
        <Wrapper>
            <Typography variant="h4">{value}</Typography>
            <Typography>{description}</Typography>
            <ProgressBar
                variant="determinate"
                value={progress}
                color={progressColor().progress}
                background={progressColor().progressBg}
            />
        </Wrapper>
    );
};

export interface KpiStatusItem {
    type: 'StatusItem';
    value: string;
    description: string;
    statusText: string;
    status: () => string;
}

export const KpiStatus = ({
    value,
    description,
    status,
    statusText,
}: KpiStatusItem): JSX.Element => {
    return (
        <Wrapper>
            <Typography variant="h4">{value}</Typography>
            <Typography>{description}</Typography>
            <StatusChipWrapper>
                <StatusChip background={status() === '' ? '#bbbbbb' : status()} />
                {statusText}
            </StatusChipWrapper>
        </Wrapper>
    );
};
