import { useEffect, useState } from 'react';
import { Document } from '../../../Types/scopeChangeRequest';
import { Document as StidDocument } from '../../../Api/STID/Types/Document';
import { StidDocument as StidVisual } from '../../StidDocument';
import { getDocumentById } from '../../../Api/STID/getDocumentById';
import { useApiClient } from '../../../../../Core/Client/Hooks/useApiClient';
import styled from 'styled-components';

interface StidDocumentResolverProps {
    inputDocuments: Document[];
}
export const StidDocumentResolver = ({
    inputDocuments,
}: StidDocumentResolverProps): JSX.Element => {
    const { customApi } = useApiClient('1734406c-3449-4192-a50d-7c3a63d3f57d/.default');

    useEffect(() => {
        const resolveDocuments = async () => {
            inputDocuments.forEach(async (x) => {
                const resolvedDocument = await getDocumentById(
                    'JCA',
                    x.stidDocumentNumber,
                    customApi
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
                    <LoadingMessage>Loading documents....</LoadingMessage>
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
