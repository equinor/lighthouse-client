import Highlighter from 'react-highlight-words';

// export function getHighlightedText(text = '', higlights?: string) {
//     if (!higlights) return text;
//     // Split text on higlight term, include term itself into parts, ignore case
//     return higlights.split(' ').map((higlight) => {
//         const parts = text.split(new RegExp(`(${higlight})`, 'gi'));
//         return parts.map((part, index) => (
//             <React.Fragment key={index}>
//                 {part.toLowerCase() === higlight.toLowerCase() ? (
//                     <b style={{ backgroundColor: tokens.colors.interactive.text_highlight.hex }}>
//                         {part}
//                     </b>
//                 ) : (
//                     part
//                 )}
//             </React.Fragment>
//         ));
//     });
// }

export const getHighlightedText = (text: string, searchValue: string): JSX.Element => {
    text = text.replaceAll('"', '');

    return (
        <Highlighter
            searchWords={searchValue.replaceAll('"', '').split(' ')}
            autoEscape={true}
            textToHighlight={text}
        />
    );
};
