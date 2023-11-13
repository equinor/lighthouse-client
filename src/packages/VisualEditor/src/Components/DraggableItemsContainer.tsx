import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { DragElement } from './DragElement';
import { DraggableItem } from '../Types/DraggableItem';

const DraggableHandleSelector = 'globalDraggableHandle';

interface DraggableItemsContainerProps<T> {
    onChange: (newDragItems: DraggableItem<T>[]) => void;
    items: T[];
    viewKey: keyof T;
    CustomComponent?: React.FC<{ displayName: T[keyof T] }>;
}

export function DraggableItemsContainer<T>({
    onChange,
    items,
    viewKey,
    CustomComponent,
}: DraggableItemsContainerProps<T>): JSX.Element {
    const [dragItems, setDragItems] = useState<DraggableItem<T>[]>(
        items.map((item, id) => {
            return { id, item };
        })
    );

    useEffect(() => {
        setDragItems(
            items.map((item, id) => {
                return { id, item };
            })
        );
    }, [items]);

    const deleteFunc = (id: number) => {
        onChange(dragItems.filter((item) => item.id !== id));
    };

    return (
        <>
            {dragItems.length > 0 && (
                <ReactSortable
                    animation={200}
                    handle={`.${DraggableHandleSelector}`}
                    list={dragItems}
                    onEnd={(): void => {
                        onChange(dragItems);
                    }}
                    setList={setDragItems}
                >
                    {dragItems.map((dragItem) => (
                        <div
                            key={dragItem.id}
                            style={{ padding: '20px' }}
                            className={DraggableHandleSelector}
                        >
                            {CustomComponent ? (
                                <CustomComponent displayName={dragItem.item[viewKey]} />
                            ) : (
                                <DragElement
                                    displayName={dragItem.item[viewKey]}
                                    id={dragItem.id}
                                    deleteFunc={deleteFunc}
                                />
                            )}
                        </div>
                    ))}
                </ReactSortable>
            )}
        </>
    );
}
