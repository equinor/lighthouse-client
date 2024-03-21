import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import styled from 'styled-components';
import { LI, OL } from './ComponentOverrides';

// Doing it like this because of jest failing...
const StyledMarkdown = styled((props) => <Markdown {...props} />)`
  font-size: 16px !important;
  word-break: break-word;
  p {
    font-size: 16px !important;
  }

  ul {
    line-height: 1em;
    li::marker {
      color: #007079;
    }
  }
`;
type MarkdownViewerProps = {
  /** A string with valid markdown syntax */
  children: string;
};
export const MarkdownViewer = ({ children }: MarkdownViewerProps): JSX.Element => {
  const overrides: MarkdownToJSX.Overrides = {
    ol: {
      component: OL,
    },
    li: {
      component: LI,
    },
  };

  return (
    <StyledMarkdown
      options={{
        overrides: overrides,
      }}
    >
      {children}
    </StyledMarkdown>
  );
};
