import { useDataContext } from '../../CompletionView/src/Context/DataProvider';
import { Item } from '../Styles/item';
import { useParkViewContext } from '../Context/ParkViewProvider';

interface RenderItemsProps<T> {
    data: T[];
}

export function Items<T>({ data }: RenderItemsProps<T>): JSX.Element | null {
    const { setSelected } = useDataContext();
    const { itemKey, customView, status } = useParkViewContext<T>();

    return (
        <>
            {Object.keys(data).map((key, index) =>
                customView?.CustomItemView ? (
                    <customView.CustomItemView
                        data={data[key]}
                        itemKey={itemKey.toString()}
                        key={data[key] + index}
                        onClick={() => setSelected(data[key])}
                    >
                        {data[key][itemKey]}
                    </customView.CustomItemView>
                ) : (
                    <Item key={data[key] + index} onClick={() => setSelected(data[key])}>
                        {status?.statusItemFunc(data[key]).statusElement}
                        {data[key][itemKey]}
                    </Item>
                )
            )}
        </>
    );
}
