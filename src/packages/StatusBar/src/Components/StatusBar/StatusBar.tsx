import { Item, StatusItem } from '../StatusItem/StatusItem';
import { StatusWrapper } from './StatusBarStyles';

interface StatusBarProps {
    data: StatusItem[];
}

export function StatusBar({ data }: StatusBarProps): JSX.Element {
    return (
        <StatusWrapper>
            {data.map(({ title, value, description, weeklyChange }, index) => (
                <Item
                    key={title + index}
                    title={title}
                    value={value}
                    description={description}
                    weeklyChange={weeklyChange}
                />
            ))}
        </StatusWrapper>
    );
}
