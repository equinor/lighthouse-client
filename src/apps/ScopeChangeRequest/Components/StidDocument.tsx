import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';

import styled from 'styled-components';
import { Document } from '../Api/Search/STID/Types/Document';

interface StidDocumentProps {
    document: Document;
}

export const StidDocument = ({ document }: StidDocumentProps): JSX.Element => {
    const revDate = new Date(document.revDate).toISOString().slice(0, 10);
    return (
        <Inline>
            <Icon name="file_copy" color={tokens.colors.interactive.primary__resting.rgba} />
            <Inline>
                <LineBreaks
                    style={{
                        fontSize: '16px',
                        color: `${tokens.colors.interactive.primary__resting.rgba}`,
                    }}
                >
                    <Inline>
                        <span>
                            {document.docNo} - {document.docTitle}
                        </span>
                    </Inline>
                    <Inline>
                        <span>
                            {`Revision ${document.revNo} | Rev date ${revDate} | Reason for issue ${document.reasonForIssue}`}
                        </span>
                    </Inline>
                </LineBreaks>
            </Inline>
        </Inline>
    );
};

const LineBreaks = styled.div`
    display: flex;
    flex-direction: column;
`;

const Inline = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
