import { useDataContext } from "../../CompletionView/src/Context/DataProvider";
import { Pack } from "../Styles/gardenStyle";

interface RenderItemsProps<T> {
    data: T[];
    itemKey: string;
}

export function Items<T>({ data, itemKey }: RenderItemsProps<T>): JSX.Element {
    const { setSelected } = useDataContext()
    return (
        <>
            {
                Object.keys(data).map((key, index) => (
                    <Pack key={data[key][itemKey] + index} onClick={() => setSelected(data[key][itemKey])}>{data[key][itemKey]}</Pack>
                ))
            }
        </>
    );
}