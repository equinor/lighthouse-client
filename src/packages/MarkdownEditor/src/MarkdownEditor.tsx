import { FC, PropsWithChildren, useCallback } from 'react';

import {
  BoldExtension,
  BulletListExtension,
  ItalicExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
  HardBreakExtension,
  TaskListExtension,
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
import { theme } from './theme';
import { StyledContainer } from './editor.styles';

export type ReactEditorProps = Pick<CreateEditorStateProps, 'stringHandler'> &
  Pick<RemirrorProps, 'initialContent' | 'editable' | 'autoFocus' | 'hooks'> & {
    placeholder?: string;
    commandButtons?: JSX.Element[]
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
      new TaskListExtension(),
      new OrderedListExtension(),
      new MarkdownExtension({ copyAsMarkdown: false }),
      new HardBreakExtension(),
    ],
    [placeholder]
  );

  const { manager } = useRemirror({
    extensions,
    stringHandler: 'markdown',
  });

  return (
    <StyledContainer>
      <ThemeProvider theme={theme}>
        <Remirror manager={manager} initialContent={initialContent} {...rest}>
          <Toolbar>
            <ToggleBoldButton />
            <ToggleItalicButton />
            <ToggleOrderedListButton />
            <ToggleBulletListButton />
            {rest?.commandButtons}
          </Toolbar>
          <EditorComponent />
          {children}
        </Remirror>
      </ThemeProvider>
    </StyledContainer >
  );
};
