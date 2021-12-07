import styled from 'styled-components';
import { StidDocument } from '../../../Types/stidDocument';

import { DocumentIcon } from '../Styles/DocumentIcon';

interface DocumentsProps {
    documents?: StidDocument[];
}

export const Documents = ({ documents }: DocumentsProps): JSX.Element => {
    return (
        <DocumentContainer>
            <DocumentIcon />
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
