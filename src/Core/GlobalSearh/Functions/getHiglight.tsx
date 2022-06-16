import { tokens } from '@equinor/eds-tokens';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';

const Highlight = styled(Highlighter)`
    .highlight {
        background-color: ${tokens.colors.interactive.text_highlight.hex};
    }
`;

export const getHighlightedText = (text: string, searchValue: string): JSX.Element => {
    text = text.replaceAll('"', '');

    return (
        <Highlight
            searchWords={searchValue.replaceAll('"', '').split(' ')}
            autoEscape={true}
            highlightClassName="highlight"
            textToHighlight={text}
        />
    );
};
