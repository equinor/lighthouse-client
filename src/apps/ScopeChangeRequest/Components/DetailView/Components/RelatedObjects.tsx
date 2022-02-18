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
import { Tag as TagComp } from './RelatedObjects/Tags/Tag';
import { Area as AreaComp } from './RelatedObjects/Area/Area';
import { Discipline as DisciplineComp } from './RelatedObjects/Discipline/Discipline';
import { CommPkg } from './RelatedObjects/CommPkg/CommPkg';
import { System as SystemComp } from './RelatedObjects/Systems/System';
import { StidDocument as StidVisual } from '../../STID';

interface RelatedObjectsProps {
    systems: System[];
    commPkgs: CommissioningPackage[];
    tags: Tag[];
    areas: Area[];
    disciplines: Discipline[];
    documents: Document[];
}

export const RelatedObjects = ({
    commPkgs = [],
    systems = [],
    tags = [],
    documents = [],
    disciplines = [],
    areas = [],
}: RelatedObjectsProps): JSX.Element => {
    return (
        <Wrapper>
            {tags && tags.length > 0 && (
                <ChevronList title={`Tags (${tags?.length})`}>
                    <>
                        {tags.map((x) => (
                            <TagComp key={x.id} tag={x} />
                        ))}
                    </>
                </ChevronList>
            )}
            {commPkgs && commPkgs.length > 0 && (
                <ChevronList title={`Comm pkgs (${commPkgs.length})`}>
                    <>
                        {commPkgs.map((x) => (
                            <CommPkg commPkg={x} key={x.id} />
                        ))}
                    </>
                </ChevronList>
            )}
            {systems && systems.length > 0 && (
                <ChevronList title={`Systems (${systems.length})`}>
                    <>
                        {systems.map((x) => (
                            <SystemComp system={x} key={x.id} />
                        ))}
                    </>
                </ChevronList>
            )}

            {documents && documents.length > 0 && (
                <ChevronList title={`Documents (${documents.length})`}>
                    <>
                        {documents.map((x) => (
                            <StidVisual key={x.stidDocumentNumber} docNo={x.stidDocumentNumber} />
                        ))}
                    </>
                </ChevronList>
            )}

            {disciplines && disciplines.length > 0 && (
                <ChevronList title={`Disciplines (${disciplines.length})`}>
                    <>
                        {disciplines.map((x) => (
                            <DisciplineComp key={x.id} discipline={x} />
                        ))}
                    </>
                </ChevronList>
            )}

            {areas && areas.length > 0 && (
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
    gap: 1em;
`;
