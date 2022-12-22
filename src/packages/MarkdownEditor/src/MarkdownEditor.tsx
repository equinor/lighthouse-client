import '@remirror/styles/all.css';

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

import type { CreateEditorStateProps } from 'remirror';
import type { RemirrorProps } from '@remirror/react';

export interface ReactEditorProps
    extends Pick<CreateEditorStateProps, 'stringHandler'>,
        Pick<RemirrorProps, 'initialContent' | 'editable' | 'autoFocus' | 'hooks'> {
    placeholder?: string;
}
export interface MarkdownEditorProps extends Partial<Omit<ReactEditorProps, 'stringHandler'>> {}

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
export const MarkdownEditor: FC<PropsWithChildren<MarkdownEditorProps>> = ({
    placeholder,
    children,
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
        <ThemeProvider>
            <Remirror manager={manager} {...rest}>
                <Toolbar>
                    <ToggleBoldButton />
                    <ToggleItalicButton />
                    <ToggleOrderedListButton />
                    <ToggleBulletListButton />
                </Toolbar>
                <EditorComponent />
                {children}
            </Remirror>
        </ThemeProvider>
    );
};
