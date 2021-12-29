import { Button, Input, TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import styled from 'styled-components';
import { DraggableItemsContainer } from './DraggableItemsContainer';
import { DraggableItem } from '../Types/DraggableItem';
import { EditorFrame } from '../Styles/editorFrame';
import { ButtonSection } from '../Styles/buttonSection';
import { Title } from '../../../../styles/header';

interface VisualEditorProps<T> {
    items: T[];
    newItemFunction: () => T;
    buttons: React.FC<{ items: T[] }>[];
}

export function VisualEditor<T>({
    items,
    newItemFunction,
    buttons,
}: VisualEditorProps<T>): JSX.Element | null {
    const [dragItems, setDragItems] = useState<T[]>(items);

    const onChange = (newDragItems: DraggableItem<T>[]) => {
        setDragItems(newDragItems.map((x) => x.item));
    };

    const updateDragItem = (dragItem: T, index: number) => {
        const updateDragItems = dragItems;

        updateDragItems[index] = dragItem;
        setDragItems(updateDragItems);
    };

    return (
        <div style={{ padding: '2em' }}>
            <Title>Workflow</Title>
            <TextField style={{ width: '17em' }} label="Workflow title" id={'textInput'} />
            <div style={{ marginBottom: '5em' }} />
            <EditorFrame>
                <DraggableItemsContainer
                    onChange={onChange}
                    items={dragItems}
                    updateDragItem={updateDragItem}
                />
            </EditorFrame>

            <Button
                style={{ padding: '3em' }}
                variant="ghost_icon"
                onClick={() => {
                    setDragItems([...dragItems, newItemFunction()]);
                }}
            >
                + add step
            </Button>
            <ButtonSection>
                {buttons.map((Button) => (
                    <>
                        <Button key={Button.toString()} items={dragItems}></Button>
                        <HorizontalSpacer />
                    </>
                ))}
            </ButtonSection>
        </div>
    );
}

const HorizontalSpacer = styled.div`
    margin: 5px;
`;

const ButtonWrapper = styled.div`
    display: flex;
`;
