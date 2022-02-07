import { useState } from 'react';
import { TextField } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

interface Return {
    text: string | undefined;
    setText: (value: string | undefined) => void;
    Component: () => JSX.Element;
}

export function useTextField(title?: string): Return {
    const [text, setText] = useState<string | undefined>(undefined);

    return {
        text,
        setText,
        Component: () => (
            <>
                <Title>{title}</Title>
                <TextField
                    id={'textField'}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </>
        ),
    };
}

const Title = styled.div`
    font-size: 14px;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
`;
