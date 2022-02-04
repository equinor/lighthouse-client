import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';

import styled from 'styled-components';
import { Document } from '../Api/STID/Types/Document';

interface StidDocumentProps {
    document: Document;
}

export const StidDocument = ({ document }: StidDocumentProps): JSX.Element => {
    const revDate = new Date(document.revDate).toISOString().slice(0, 10);
    const handleRedirect = (docNo: string) => {
        window.open(`https://lci.equinor.com/JCA/doc?docNo=${docNo}`);
    };
    return (
        <Wrapper>
            <IconWrapper>
                <Icon name="file_copy" color={tokens.colors.interactive.primary__resting.rgba} />
            </IconWrapper>
            <Inline>
                <LineBreaks
                    style={{
                        fontSize: '16px',
                        color: `${tokens.colors.interactive.primary__resting.rgba}`,
                    }}
                >
                    <Link onClick={() => handleRedirect(document.docNo)}>
                        <Details>
                            {document.docNo} - {document.docTitle}
                        </Details>
                    </Link>
                    <Inline>
                        <MetaData>
                            {`Revision ${document.revNo} | Rev date ${revDate} | Reason for issue ${document.reasonForIssue}`}
                        </MetaData>
                    </Inline>
                </LineBreaks>
            </Inline>
        </Wrapper>
    );
};

const IconWrapper = styled.div`
    width: 24px;
    height: 24px;
`;

const LineBreaks = styled.div`
    display: flex;
    flex-direction: column;
`;

const Details = styled.div`
    max-width: 500px;
    font-size: 16px;
    text-overflow: ellipsis;
`;

const MetaData = styled.div`
    font-size: 10px;
`;

const Inline = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 650px;
    padding: 0.2em 0em;
`;

const Link = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;
