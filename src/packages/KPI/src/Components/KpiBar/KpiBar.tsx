import { Item, KpiItem } from '../KpiItem/KpiItem';
import { StatusWrapper } from './KpiBarStyles';

interface KpiBarProps {
    data: KpiItem[];
}

export function KpiBar({ data }: KpiBarProps): JSX.Element {
    return (
        <StatusWrapper>
            {data.map(({ title, value, description, status, tooltipContent }, index) => (
                <Item
                    key={title + index}
                    title={title}
                    value={value}
                    description={description}
                    status={status}
                    tooltipContent={tooltipContent}
                />
            ))}
        </StatusWrapper>
    );
}
