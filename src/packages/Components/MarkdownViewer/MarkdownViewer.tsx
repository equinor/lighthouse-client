import dompurify from 'dompurify';
import { marked } from 'marked';
import { FC } from 'react';
import { Markdown } from './MarkdownViewerStyles';

type MarkdownViewerProps = {
    markdown: string;
};

export const MarkdownViewer: FC<MarkdownViewerProps> = ({ markdown }) => {
    return (
        <Markdown
            dangerouslySetInnerHTML={{ __html: dompurify.sanitize(marked.parse(markdown)) }}
        />
    );
};

export default MarkdownViewer;
