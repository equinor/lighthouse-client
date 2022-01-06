import React from 'react';
import { openSidesheet } from '../../../Core/PopoutSidesheet/Functions/openSidesheet';
import { useDataContext } from '../../../Core/WorkSpace/src/Context/DataProvider';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { Item } from '../Styles/item';
import { Garden } from './Garden';

interface RenderItemsProps<T> {
    data: T[];
}

export function Items<T>({ data }: RenderItemsProps<T>): JSX.Element | null {
    const { setSelected, dataViewSideSheetOptions, gardenOptions } = useDataContext();
    const { itemKey, customView, status } = useParkViewContext<T>();

    return (
        <>
            {Object.keys(data).map((key, index) =>
                customView?.CustomItemView ? (
                    <customView.CustomItemView
                        data={data[key]}
                        itemKey={itemKey.toString()}
                        key={data[key] + index}
                        onClick={() => {
                            if (dataViewSideSheetOptions?.CustomComponent) {
                                openSidesheet(dataViewSideSheetOptions.CustomComponent, {
                                    object: data[key],
                                });
                            } else {
                                setSelected(data[key]);
                            }
                        }}
                    >
                        {data[key][itemKey]}
                    </customView.CustomItemView>
                ) : (
                    <Item
                        key={data[key] + index}
                        onClick={() => {
                            openSidesheet(dataViewSideSheetOptions?.CustomComponent, {
                                object: data[key],
                            });
                        }}
                    >
                        {status?.statusItemFunc(data[key]).statusElement}
                        {data[key][itemKey]}
                    </Item>
                )
            )}
        </>
    );
}
