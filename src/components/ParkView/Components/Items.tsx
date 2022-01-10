import React from 'react';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { Item } from '../Styles/item';

interface RenderItemsProps<T> {
    data: T[];
}

export function Items<T>({ data }: RenderItemsProps<T>): JSX.Element | null {
    const { itemKey, customView, status, onSelect } = useParkViewContext<T>();

    return (
        <>
            {Object.keys(data).map((key, index) =>
                customView?.CustomItemView ? (
                    <customView.CustomItemView
                        data={data[key]}
                        itemKey={itemKey.toString()}
                        key={data[key] + index}
                        onClick={() => {
                            onSelect(data[key]);
                        }}
                    >
                        {data[key][itemKey]}
                    </customView.CustomItemView>
                ) : (
                    <Item key={data[key] + index} onClick={() => onSelect(data[key])}>
                        {status?.statusItemFunc(data[key]).statusElement}
                        {data[key][itemKey]}
                    </Item>
                )
            )}
        </>
    );
}
