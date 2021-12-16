import { Button } from '@equinor/eds-core-react';
import { useState } from 'react';
import styled from 'styled-components';
import { DraggableItemsContainer } from './DraggableItemsContainer';
import { DraggableItem } from '../Types/DraggableItem';
import { EditorFrame } from '../Styles/editorFrame';
import { ButtonSection } from '../Styles/buttonSection';

interface VisualEditorProps<T> {
    items: T[];
    viewKey: keyof T;
    newItemFunction: () => T;
    buttons: React.FC<{ items: T[] }>[];
}

export function VisualEditor<T>({
    items,
    viewKey,
    newItemFunction,
    buttons,
}: VisualEditorProps<T>): JSX.Element | null {
    const [dragItems, setDragItems] = useState<T[]>(items);

    const onChange = (newDragItems: DraggableItem<T>[]) => {
        setDragItems(newDragItems.map((x) => x.item));
    };

    return (
        <EditorFrame>
            <DraggableItemsContainer onChange={onChange} items={dragItems} viewKey={viewKey} />

            <Button
                onClick={() => {
                    setDragItems([...dragItems, newItemFunction()]);
                }}
            >
                +
            </Button>
            <ButtonSection>
                {buttons.map((Button) => (
                    <>
                        <Button key={Button.toString()} items={dragItems}></Button>
                        <HorizontalSpacer />
                    </>
                ))}
            </ButtonSection>
        </EditorFrame>
    );
}

const HorizontalSpacer = styled.div`
    margin: 5px;
`;
