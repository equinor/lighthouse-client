import { tokens } from '@equinor/eds-tokens';
import { Tooltip } from '@equinor/eds-core-react';
import { useMemo } from 'react';
import { StatusCard, Title, Value } from './KpiItemStyles';

export interface KpiItem {
    title: string;
    value: () => string;
    description?: string;
    status: keyof Status;
    tooltipContent?: string;
}

export type KpiBuilder<T> = (data: T[]) => KpiItem[];

export interface Status {
    waring: string;
    info: string;
    ok: string;
    default: string;
}

export function Item({
    status,
    title,
    value,
    tooltipContent,
}: React.PropsWithChildren<KpiItem>): JSX.Element {
    const colors: Status = useMemo(
        () => ({
            waring: `${tokens.colors.interactive.danger__resting.hex}`,
            info: `${tokens.colors.interactive.warning__resting.hex}`,
            ok: `${tokens.colors.interactive.success__resting.hex}`,
            default: `${tokens.colors.interactive.primary__resting.hex}`,
        }),
        []
    );

    return (
        <StatusCard color={colors[status]}>
            <Value>{value()}</Value>
            <div>
                <Tooltip
                    title={tooltipContent}
                    hidden={tooltipContent === undefined || tooltipContent.length === 0}
                >
                    <Title>{title}</Title>
                </Tooltip>
            </div>
        </StatusCard>
    );
}
