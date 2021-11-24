import { useDataContext } from '../../CompletionView/src/Context/DataProvider';
import { Dot, Item } from '../Styles/gardenStyle';

interface RenderItemsProps<T> {
    data: T[];
    itemKey: string;
    customItemView?: React.FC<{ data: T; itemKey: string; onClick: () => void }>;
    statusFunc?: (data: T) => string;
}

export function Items<T>({
    data,
    itemKey,
    customItemView,
    statusFunc,
}: RenderItemsProps<T>): JSX.Element {
    const { setSelected } = useDataContext();
    const CustomRender = customItemView;

    return (
        <>
            {Object.keys(data).map((key, index) =>
                CustomRender ? (
                    <CustomRender
                        data={data[key]}
                        itemKey={itemKey}
                        key={data[key] + index}
                        onClick={() => setSelected(data[key][itemKey])}
                    >
                        {data[key][itemKey]}
                    </CustomRender>
                ) : (
                    <Item key={data[key] + index} onClick={() => setSelected(data[key][itemKey])}>
                        {statusFunc && <Dot color={statusFunc(data[key])} />}
                        {data[key][itemKey]}
                    </Item>
                )
            )}
        </>
    );
}
