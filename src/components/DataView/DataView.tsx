import { Wrapper } from "./DataView.styles";

interface DataViewProps<T> {
    data: T
}

export function DataView<T>({ data }: DataViewProps<T>): JSX.Element {
    return (
        <Wrapper>
            {JSON.stringify(data)}
        </Wrapper>
    );
}