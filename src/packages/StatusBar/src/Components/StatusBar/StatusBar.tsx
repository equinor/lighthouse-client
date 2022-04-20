import { Item, StatusItem } from '../StatusItem/StatusItem';
import { StatusWrapper } from './StatusBarStyles';

interface StatusBarProps {
    statusItems?: StatusItem[];
}

export function StatusBar({ statusItems }: StatusBarProps): JSX.Element {
    return (
        <StatusWrapper>
            {statusItems &&
                statusItems.map(({ title, value, description, weeklyChange }, index) => (
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
