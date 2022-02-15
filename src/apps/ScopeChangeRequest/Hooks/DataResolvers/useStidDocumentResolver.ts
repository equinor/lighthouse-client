import { Document } from '../../Types/scopeChangeRequest';
import { Document as StidDocument } from '../../Api/STID/Types/Document';
import { getDocumentById } from '../../Api/STID/getDocumentById';
import { useEffect, useState } from 'react';

interface StidDocuments {
    documents: StidDocument[];
}

/**
 * Hook for resolving a list of documents by their ID's
 */
export function useStidDocumentResolver(inputDocuments: Document[] | undefined): StidDocuments {
    const [documents, setDocuments] = useState<StidDocument[]>([]);
    const addDocument = (document: StidDocument) => setDocuments((prev) => [...prev, document]);

    function checkDuplicate(document: StidDocument): boolean {
        return documents.map((x) => x.docNo).includes(document.docNo);
    }

    useEffect(() => {
        if (!inputDocuments) return;
        const resolveDocuments = async () => {
            inputDocuments.forEach(async (x) => {
                const resolvedDocument = await getDocumentById('JCA', x.stidDocumentNumber);
                if (!checkDuplicate(resolvedDocument)) {
                    addDocument({
                        ...resolvedDocument,
                        revNo: resolvedDocument.currentRevision.revNo,
                        revDate: resolvedDocument.currentRevision.revDate,
                        reasonForIssue: resolvedDocument.currentRevision.reasonForIssue,
                    });
                }
            });
        };
        setDocuments([]);
        resolveDocuments();
    }, [inputDocuments]);

    return {
        documents: documents,
    };
}
