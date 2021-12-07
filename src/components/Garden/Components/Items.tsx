import { useDataContext } from '../../CompletionView/src/Context/DataProvider';
import { Item } from '../Styles/item';
import { Dot } from '../Styles/dot';
import { useGardenContext } from '../Context/GardenProvider';

interface RenderItemsProps<T> {
    data: T[];
}

export function Items<T>({ data }: RenderItemsProps<T>): JSX.Element | null {
    const { setSelected } = useDataContext();
    const { itemKey, customItemView, statusFunc } = useGardenContext<T>();

    const CustomRender = customItemView;

    return (
        <>
            {Object.keys(data).map((key, index) =>
                CustomRender ? (
                    <CustomRender
                        data={data[key]}
                        itemKey={itemKey.toString()}
                        key={data[key] + index}
                        onClick={() => setSelected(data[key][itemKey])}
                    >
                        {data[key][itemKey]}
                    </CustomRender>
                ) : (
                    <Item key={data[key] + index} onClick={() => setSelected(data[key])}>
                        {statusFunc && <Dot color={statusFunc(data[key])} />}
                        {data[key][itemKey]}
                    </Item>
                )
            )}
        </>
    );
}
