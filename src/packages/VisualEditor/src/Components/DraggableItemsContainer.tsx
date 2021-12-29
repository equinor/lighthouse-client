import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { DragElement } from './DragElement';
import { DraggableItem } from '../Types/DraggableItem';
import { Button, Checkbox, Icon, Input, SingleSelect, TextField } from '@equinor/eds-core-react';
import styled from 'styled-components';

const DraggableHandleSelector = 'globalDraggableHandle';

interface DraggableItemsContainerProps<T> {
    onChange: (newDragItems: DraggableItem<T>[]) => void;
    items: T[];
    updateDragItem: (dragItem: T, index: number) => void;
    CustomComponent?: React.FC<{ displayName: T[keyof T] }>;
}

export function DraggableItemsContainer<T>({
    onChange,
    items,
    updateDragItem,
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
    }, [items.length]);

    const deleteFunc = (id: number) => {
        onChange(dragItems.filter((item) => item.id !== id));
    };

    return (
        <>
            {dragItems.length > 0 && (
                <ReactSortable
                    style={{ width: '100%' }}
                    animation={200}
                    handle={`.${DraggableHandleSelector}`}
                    list={dragItems}
                    onEnd={(): void => {
                        onChange(dragItems);
                    }}
                    setList={setDragItems}
                >
                    {dragItems.map((dragItem, index) => (
                        <div key={dragItem.id}>
                            <DragElement
                                item={dragItem.item}
                                dragItemId={dragItem.id}
                                deleteFunc={deleteFunc}
                                updateDragItem={updateDragItem}
                                index={index}
                                dragHandleName={DraggableHandleSelector}
                            />
                        </div>
                    ))}
                </ReactSortable>
            )}
        </>
    );
}

export const DragElementBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 0.2em;
`;
