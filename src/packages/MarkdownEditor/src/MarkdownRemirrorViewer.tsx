import { FC, PropsWithChildren, useCallback, useRef } from 'react';

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
  useHelpers,
  OnChangeJSON,
} from '@remirror/react';

import type { CreateEditorStateProps } from 'remirror';
import type { RemirrorProps } from '@remirror/react';
import { theme } from './theme';
import { StyledContainer } from './editor.styles';

export type ReactEditorProps = Pick<CreateEditorStateProps, 'stringHandler'> &
  Pick<RemirrorProps, 'initialContent' | 'autoFocus' | 'hooks'> & {
    placeholder?: string;
    onCheckboxTicked?: (val: string) => void;
    editable: boolean | 'checkboxes-only';
  };
export type MarkdownRemirrorViewerProps = Partial<Omit<ReactEditorProps, 'stringHandler'>>;

export const MarkdownRemirrorViewer: FC<PropsWithChildren<MarkdownRemirrorViewerProps>> = ({
  placeholder,
  children,
  initialContent,
  onCheckboxTicked,
  ...rest
}) => {
  const parentEl = useRef<HTMLDivElement | null>(null);
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
    <StyledContainer ref={parentEl}>
      <ThemeProvider theme={theme}>
        <Remirror
          manager={manager}
          initialContent={initialContent}
          {...rest}
          editable={rest.editable == true || rest.editable == 'checkboxes-only' ? true : false}
          onFocus={(e) => {
            // We want the editor to be non-editable but still want checkboxes to be able to be ticked
            e.view.dom.blur();
          }}
        >
          <EditorComponent />
          <DescriptionChanges
            handler={(v) => {
              onCheckboxTicked && onCheckboxTicked(v);
            }}
          />
          {children}
        </Remirror>
      </ThemeProvider>
    </StyledContainer>
  );
};

export const DescriptionChanges = (props: { handler: (val: string) => void }): JSX.Element => {
  const { getMarkdown } = useHelpers(true);

  const onChange = useCallback(() => {
    props.handler(getMarkdown());
  }, [getMarkdown, props.handler]);

  return <OnChangeJSON onChange={onChange} />;
};
