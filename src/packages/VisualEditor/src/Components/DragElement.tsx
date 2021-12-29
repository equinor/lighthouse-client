import { Button, Checkbox, Icon, SingleSelect, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface DragElementProps<T> {
    item: T;
    dragItemId: number;
    deleteFunc: (id: number) => void;
    updateDragItem: (dragItem: T, index: number) => void;
    index: number;
    dragHandleName: string;
}

export function DragElement<T>({
    item,
    dragItemId,
    index,
    deleteFunc,
    updateDragItem,
    dragHandleName,
}: DragElementProps<T>): JSX.Element {
    return (
        <WorkflowRow>
            <SingleSelect
                style={{ width: '17em' }}
                items={['Contributor', 'Callout', 'Approver']}
                label={'Type'}
                handleSelectedItemChange={(type) => {
                    item['type'] = type.selectedItem;
                    updateDragItem(item, index);
                }}
            />
            <HorizontalSpacer />
            <TextField style={{ width: '17em' }} label="Step title" id={'textInput'} />
            <HorizontalSpacer />
            <SingleSelect
                style={{ width: '17em' }}
                items={['Functional role 1', 'Functional role 2']}
                label="Functional role"
                handleSelectedItemChange={(functionalRole) => {
                    item['functionalRole'] = functionalRole.selectedItem;
                    updateDragItem(item, index);
                }}
            />
            <Checkbox /> Can add contributors
            <HorizontalSpacer />
            <Button
                variant="ghost_icon"
                onClick={() => {
                    deleteFunc(dragItemId);
                }}
            >
                <Icon
                    name="delete_to_trash"
                    color={tokens.colors.infographic.primary__moss_green_100.hex}
                />
            </Button>
            <div key={dragItemId} style={{ padding: '20px' }} className={dragHandleName}>
                <Icon
                    name="arrow_down"
                    color={tokens.colors.infographic.primary__moss_green_100.hex}
                />
                <Icon
                    name="arrow_up"
                    color={tokens.colors.infographic.primary__moss_green_100.hex}
                />
            </div>
            <Button variant="ghost_icon">Void</Button>
        </WorkflowRow>
    );
}

const HorizontalSpacer = styled.div`
    padding: 0.7em;
`;

const WorkflowRow = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 80%;
`;
