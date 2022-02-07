import styled from 'styled-components';
import { CommissioningPackage, Tag, System, Document } from '../../../Types/scopeChangeRequest';

import { ChevronList } from './ChevronList/ChevronList';
import { Tag as TagComp } from './Tags/Tag';
import { CommPkg } from './CommPkg/CommPkg';
import { System as SystemComp } from './Systems/System';
import { useHttpClient } from '@equinor/portal-client';
import { useEffect, useState } from 'react';
import { getDocumentById } from '../../../Api/STID/getDocumentById';
import { Document as StidDocument } from '../../../Api/STID/Types/Document';
import { StidDocument as StidVisual } from '../../StidDocument';

interface RelatedObjectsProps {
    systems?: System[];
    commPkgs?: CommissioningPackage[];
    tags?: Tag[];
    areas?: unknown[];
    disciplines?: unknown[];
    documents?: Document[];
}

export const RelatedObjects = ({
    commPkgs,
    systems,
    tags,
    documents: inputDocuments,
}: RelatedObjectsProps): JSX.Element => {
    const { STID } = useHttpClient();

    useEffect(() => {
        const resolveDocuments = async () => {
            if (inputDocuments) {
                inputDocuments.forEach(async (x) => {
                    const resolvedDocument = await getDocumentById(
                        'JCA',
                        x.stidDocumentNumber,
                        STID
                    );
                    addDocument({
                        ...resolvedDocument,
                        revNo: resolvedDocument.revNo,
                        revDate: resolvedDocument.currentRevision.revDate,
                        reasonForIssue: resolvedDocument.currentRevision.reasonForIssue,
                    });
                });
            }
            setDocuments([]);
        };
        resolveDocuments();
    }, [inputDocuments]);

    const [documents, setDocuments] = useState<StidDocument[]>([]);
    const addDocument = (document: StidDocument) => setDocuments((prev) => [...prev, document]);

    return (
        <Wrapper>
            {tags && (
                <ChevronList title={`Tags (${tags?.length})`}>
                    <>
                        {tags.map((x) => (
                            <TagComp key={x.id} tag={x} />
                        ))}
                    </>
                </ChevronList>
            )}
            {commPkgs && (
                <ChevronList title={`Comm pkgs (${commPkgs.length})`}>
                    <>
                        {commPkgs.map((x) => (
                            <CommPkg commPkg={x} key={x.id} />
                        ))}
                    </>
                </ChevronList>
            )}
            {systems && (
                <ChevronList title={`Systems (${systems.length})`}>
                    <>
                        {systems.map((x) => (
                            <SystemComp system={x} key={x.id} />
                        ))}
                    </>
                </ChevronList>
            )}

            {documents && (
                <ChevronList title={`Documents (${documents.length})`}>
                    <>
                        {documents.map((x) => (
                            <StidVisual key={x.docNo} document={x} />
                        ))}
                    </>
                </ChevronList>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
