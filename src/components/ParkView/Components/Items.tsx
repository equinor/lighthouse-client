import { useDataContext } from '../../../Core/WorkSpace/src/Context/DataProvider';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { Item } from '../Styles/item';

interface RenderItemsProps<T> {
    data: T[];
    columnExpanded: boolean;
}

export function Items<T>({ data, columnExpanded }: RenderItemsProps<T>): JSX.Element | null {
    const { setSelected } = useDataContext();
    const { itemKey, customView, status } = useParkViewContext<T>();

    const View = (customView as any)?.customItemView || null;

    return (
        <>
            {Object.keys(data).map((key, index) =>
                View ? (
                    <View
                        data={data[key]}
                        itemKey={itemKey.toString()}
                        key={data[key] + index}
                        onClick={() => setSelected(data[key])}
                        columnExpanded={columnExpanded}
                    />
                ) : (
                    <Item key={data[key] + index} onClick={() => setSelected(data[key])}>
                        {status?.statusItemFunc(data[key]).statusElement}
                        {data[key][itemKey]} cdb
                    </Item>
                )
            )}
        </>
    );
}
