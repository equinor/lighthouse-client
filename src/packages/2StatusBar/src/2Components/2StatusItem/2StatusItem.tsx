import { tokens } from '@equinor/eds-tokens';
import { useMemo } from 'react';
import { StatusCard, Title, Value } from './2StatusItemStyles';

export interface StatusItem {
    title: string;
    value: () => string;
    description?: string;
    status: keyof Status;
}

export interface Status {
    waring: string;
    info: string;
    ok: string;
    default: string;
}

export function Item({ status, title, value }: React.PropsWithChildren<StatusItem>): JSX.Element {
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
            <div>
                <Title>{title}</Title>
            </div>
            <Value>{value()}</Value>
        </StatusCard>
    );
}
