import styled from 'styled-components';
import { StidDocument } from '../../../Types/stidDocument';

interface DocumentsProps {
    documents?: StidDocument[];
}

export const Documents = ({ documents }: DocumentsProps): JSX.Element => {
    return (
        <DocumentContainer>
            {documents &&
                documents.map((x) => (
                    <div key={x.id}>
                        <p>{x.name}</p>
                        <p>{x.description}</p>
                    </div>
                ))}
        </DocumentContainer>
    );
};

const DocumentContainer = styled.div`
    display: flex;
`;
