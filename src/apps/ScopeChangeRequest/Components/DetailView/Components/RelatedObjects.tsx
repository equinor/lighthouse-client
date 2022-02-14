import styled from 'styled-components';
import {
    CommissioningPackage,
    Tag,
    System,
    Document,
    Discipline,
    Area,
} from '../../../Types/scopeChangeRequest';

import { ChevronList } from './ChevronList/ChevronList';
import { Tag as TagComp } from './Tags/Tag';
import { Area as AreaComp } from './Area/Area';
import { Discipline as DisciplineComp } from './Discipline/Discipline';
import { CommPkg } from './CommPkg/CommPkg';
import { System as SystemComp } from './Systems/System';
import { StidDocument as StidVisual } from '../../STID';
import { useStidDocumentResolver } from '../../../Hooks/useStidDocumentResolver';

interface RelatedObjectsProps {
    systems?: System[];
    commPkgs?: CommissioningPackage[];
    tags?: Tag[];
    areas?: Area[];
    disciplines?: Discipline[];
    documents?: Document[];
}

export const RelatedObjects = ({
    commPkgs,
    systems,
    tags,
    documents: inputDocuments,
    disciplines,
    areas,
}: RelatedObjectsProps): JSX.Element => {
    const { documents } = useStidDocumentResolver(inputDocuments);

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

            {disciplines && (
                <ChevronList title={`Disciplines (${disciplines.length})`}>
                    <>
                        {disciplines.map((x) => (
                            <DisciplineComp key={x.id} discipline={x} />
                        ))}
                    </>
                </ChevronList>
            )}

            {areas && (
                <ChevronList title={`Areas (${areas.length})`}>
                    <>
                        {areas.map((x) => (
                            <AreaComp key={x.id} area={x} />
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
