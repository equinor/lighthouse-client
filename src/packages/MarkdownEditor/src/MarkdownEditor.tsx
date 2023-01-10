import { FC, PropsWithChildren, useCallback } from 'react';

import {
    BoldExtension,
    BulletListExtension,
    ItalicExtension,
    MarkdownExtension,
    OrderedListExtension,
    PlaceholderExtension,
} from 'remirror/extensions';
import {
    EditorComponent,
    Toolbar,
    Remirror,
    ThemeProvider,
    useRemirror,
    ToggleBoldButton,
    ToggleOrderedListButton,
    ToggleItalicButton,
    ToggleBulletListButton,
} from '@remirror/react';
import { AllStyledComponent } from '@remirror/styles/styled-components';

import type { CreateEditorStateProps } from 'remirror';
import type { RemirrorProps } from '@remirror/react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const Container = styled(AllStyledComponent)`
    font-size: 16px;
    background-color: ${tokens.colors.ui.background__light.rgba};
    /* box-shadow: inset 0px -1px 0px 0px rgba(111, 111, 111, 1); */

    > div > div > div:focus {
        /* box-shadow: pink 0px 0px 0px 0.2em !important; */
    }
`;
export type ReactEditorProps = Pick<CreateEditorStateProps, 'stringHandler'> &
    Pick<RemirrorProps, 'initialContent' | 'editable' | 'autoFocus' | 'hooks'> & {
        placeholder?: string;
    };
export type MarkdownEditorProps = Partial<Omit<ReactEditorProps, 'stringHandler'>>;

export const MarkdownEditor: FC<PropsWithChildren<MarkdownEditorProps>> = ({
    placeholder,
    children,
    initialContent,
    ...rest
}) => {
    const extensions = useCallback(
        () => [
            new PlaceholderExtension({ placeholder }),
            new BoldExtension(),
            new ItalicExtension(),
            new BulletListExtension({ enableSpine: true }),
            new OrderedListExtension(),
            new MarkdownExtension({ copyAsMarkdown: false }),
        ],
        [placeholder]
    );

    const { manager } = useRemirror({
        extensions,
        stringHandler: 'markdown',
    });

    return (
        <Container>
            <ThemeProvider
                theme={{
                    space: {
                        3: '5px',
                    },
                    boxShadow: {
                        '1': 'inset 0px -1px 0px 0px rgba(111, 111, 111, 1)',
                        '2': 'inset 0px -1px 0px 0px rgba(111, 111, 111, 1)',
                        '3': 'inset 0px -1px 0px 0px rgba(111, 111, 111, 1)',
                    },
                    radius: {
                        border: '1px',
                    },

                    lineHeight: {
                        default: '1.5em',
                    },
                    fontFamily: {
                        default: 'Equinor',
                    },

                    color: {
                        primaryText: '#ffffff',
                        primary: '#007079',
                        outline: '#007079',
                        border: 'none',
                        hover: {
                            primary: '#007079',
                        },
                    },
                }}
            >
                <Remirror manager={manager} initialContent={initialContent} {...rest}>
                    <Toolbar>
                        <ToggleBoldButton color="warning" />
                        <ToggleItalicButton />
                        <ToggleOrderedListButton />
                        <ToggleBulletListButton />
                    </Toolbar>
                    <EditorComponent />
                    {children}
                </Remirror>
            </ThemeProvider>
        </Container>
    );
};
