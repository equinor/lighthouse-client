import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import styled from 'styled-components';
import { LI, OL } from './ComponentOverrides';
const StyledMarkdown = styled(Markdown)`
    font-size: 16px;
    p {
        font-size: 16px !important;
    }

    ul {
        line-height: 10px;
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
