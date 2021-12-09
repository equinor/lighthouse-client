import React, { CSSProperties, useEffect, useState } from 'react';
import { ReactSortable, SortableEvent } from 'react-sortablejs';
import styled from 'styled-components';

export interface DraggableItem<T> {
    id: number;
    item: T;
}

const DraggableHandleSelector = 'globalDraggableHandle';

export interface DraggableItemsWrapperProps<T> {
    onChange: (
        newDragItems: DraggableItem<T>[],
        oldIndex: number | undefined,
        newIndex: number | undefined
    ) => void;
    items: T[];
    objectIdentifier: keyof T;
    CustomComponent?: React.FC<{ displayName: T[keyof T] }>;
    style?: CSSProperties;
}

export function DraggableItemsWrapper<T>({
    onChange,
    items,
    objectIdentifier,
    CustomComponent,
    style,
}: DraggableItemsWrapperProps<T>): JSX.Element {
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
        onChange(
            dragItems.filter((item) => item.id !== id),
            undefined,
            undefined
        );
    };

    return (
        <div style={style}>
            {dragItems.length > 0 && (
                <ReactSortable
                    animation={200}
                    handle={`.${DraggableHandleSelector}`}
                    list={dragItems}
                    onEnd={(evt: SortableEvent): void => {
                        onChange(dragItems, evt.oldIndex, evt.newIndex);
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
                                <CustomComponent displayName={dragItem.item[objectIdentifier]} />
                            ) : (
                                <DefaultElement
                                    displayName={dragItem.item[objectIdentifier]}
                                    id={dragItem.id}
                                    deleteFunc={deleteFunc}
                                />
                            )}
                        </div>
                    ))}
                </ReactSortable>
            )}
        </div>
    );
}

interface DefaultElementProps<T> {
    displayName: T[keyof T];
    id: number;
    deleteFunc: (id: number) => void;
}

function DefaultElement<T>({ displayName, id, deleteFunc }: DefaultElementProps<T>) {
    return (
        <DragElement>
            <DeleteButton
                style={{ color: 'red' }}
                onClick={() => {
                    deleteFunc(id);
                }}
            >
                x
            </DeleteButton>
            {displayName}
        </DragElement>
    );
}

const DragElement = styled.div`
    display: flex;
    border: solid;
    padding: 20px;
    flex-direction: column;
`;

const DeleteButton = styled.div`
    display: flex;
`;
