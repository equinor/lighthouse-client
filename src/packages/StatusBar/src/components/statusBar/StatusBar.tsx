
import { Item, StatusItem } from "../satusItem/StatusItem";
import { StatusWrapper } from "./StatusBar-Styles";

interface StatusBarProps {
    data: StatusItem[]
}

export function StatusBar({ data }: StatusBarProps): JSX.Element {
    return (
        <StatusWrapper>
            {data.map(({ title, value, description, status }, index) => <Item key={title + index} title={title} value={value} description={description} status={status} />)}
        </StatusWrapper >
    );
}
