import styled from 'styled-components';
import { Document } from '../../../Api/Search/STID/Types/Document';

interface DocumentsProps {
    documents?: Document[];
}

export const Documents = ({ documents }: DocumentsProps): JSX.Element => {
    return (
        <DocumentContainer>
            {documents &&
                documents.map((x) => (
                    <div key={x.docNo}>
                        <p>{x.docNo}</p>
                        <p>{x.docTitle}</p>
                    </div>
                ))}
        </DocumentContainer>
    );
};

const DocumentContainer = styled.div`
    display: flex;
`;
