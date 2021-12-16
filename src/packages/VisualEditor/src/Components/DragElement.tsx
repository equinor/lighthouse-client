import styled from 'styled-components';
import { DragElementBox } from '../Styles/dragElementBox';

interface DragElementProps<T> {
    displayName: T[keyof T];
    id: number;
    deleteFunc: (id: number) => void;
}

export function DragElement<T>({ displayName, id, deleteFunc }: DragElementProps<T>): JSX.Element {
    return (
        <DragElementBox>
            <DeleteButton
                onClick={() => {
                    deleteFunc(id);
                }}
            >
                x
            </DeleteButton>
            <ViewKeyFrame>{displayName}</ViewKeyFrame>
        </DragElementBox>
    );
}

const DeleteButton = styled.div``;

const ViewKeyFrame = styled.div`
    display: flex;
    padding: 20px;
`;
