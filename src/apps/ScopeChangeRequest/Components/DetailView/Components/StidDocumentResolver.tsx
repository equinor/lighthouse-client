import { DotProgress } from '@equinor/eds-core-react';
import { useHttpClient } from '@equinor/portal-client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDocumentById } from '../../../Api/STID/getDocumentById';
import { Document as StidDocument } from '../../../Api/STID/Types/Document';
import { Document } from '../../../Types/scopeChangeRequest';
import { StidDocument as StidVisual } from '../../StidDocument';

interface StidDocumentResolverProps {
    inputDocuments: Document[];
}
export const StidDocumentResolver = ({
    inputDocuments,
}: StidDocumentResolverProps): JSX.Element => {
    const { customHttpClient } = useHttpClient('b827c278-12de-47a0-b789-c8d11e3b9571/.default');

    useEffect(() => {
        const resolveDocuments = async () => {
            inputDocuments.forEach(async (x) => {
                const resolvedDocument = await getDocumentById(
                    'JCA',
                    x.stidDocumentNumber,
                    customHttpClient
                );
                addDocument({
                    ...resolvedDocument,
                    revNo: resolvedDocument.currentRevision.revNo,
                    revDate: resolvedDocument.currentRevision.revDate,
                    reasonForIssue: resolvedDocument.currentRevision.reasonForIssue,
                });
            });
        };
        setDocuments([]);
        resolveDocuments();
    }, [inputDocuments]);

    const [documents, setDocuments] = useState<StidDocument[]>([]);
    const addDocument = (document: StidDocument) => setDocuments((prev) => [...prev, document]);

    return (
        <>
            <DocumentWrapper>
                {documents.length !== inputDocuments.length && (
                    <LoadingMessage>
                        <DotProgress color="primary" />
                    </LoadingMessage>
                )}
                {documents.map((x) => {
                    return <StidVisual key={x.docNo} document={x} />;
                })}
            </DocumentWrapper>
        </>
    );
};

const LoadingMessage = styled.div`
    font-size: 14px;
`;

const DocumentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
