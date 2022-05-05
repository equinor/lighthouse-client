import { tokens } from '@equinor/eds-tokens';
import { isValidElement } from 'react';
import styled from 'styled-components';

interface ItemProps<T> {
    children: React.ReactElement<T>;
}

export function Item<T>({ children }: ItemProps<T>): JSX.Element {
    const ChildElement = () => (isValidElement(children) ? children : null);

    return (
        <ListItem>
            <ChildElement />
        </ListItem>
    );
}

const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    border-top: 1px solid ${tokens.colors.interactive.disabled__border.hex};
    border-bottom: 1px solid ${tokens.colors.interactive.disabled__border.hex};
`;
