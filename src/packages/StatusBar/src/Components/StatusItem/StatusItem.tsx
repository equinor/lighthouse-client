import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export interface StatusItem {
    title: string;
    value: () => string;
    weeklyChange?: () => string;
    description?: string;
}

export function Item({
    title,
    value,
    weeklyChange,
}: React.PropsWithChildren<StatusItem>): JSX.Element {
    return (
        <StatusCard>
            <Title>{title}</Title>
            <ValueWrapper>
                <Value>{value()}</Value>
                {weeklyChange && <WeeklyChange>({weeklyChange()})</WeeklyChange>}
            </ValueWrapper>
        </StatusCard>
    );
}

const Value = styled.div`
    color: ${tokens.colors.text.static_icons__default.hex};
    font-size: 20px;
    line-height: 24px;
`;

const ValueWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2em;
`;

const WeeklyChange = styled.div`
    font-size: 14px;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
    line-height: 14px;
`;

const Title = styled.div`
    color: ${tokens.colors.text.static_icons__tertiary.hex};
    font-size: 12px;
    line-height: 16px;
`;

const StatusCard = styled.div`
    min-height: 40;
    min-width: 70;
    width: fit-content;
`;
