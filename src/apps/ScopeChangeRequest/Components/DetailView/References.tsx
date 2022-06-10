import styled from 'styled-components';

import {
    ScopeChangeArea,
    ScopeChangeDiscipline,
    ScopeChangeDocument,
    ScopeChangeTag,
    ScopeChangeSystem,
    ScopeChangeCommissioningPackage,
    ScopeChangePunch,
} from '../../types/scopeChangeRequest';
import { ChevronList } from './ChevronList/ChevronList';
import { Tag as TagComp } from './RelatedObjects/Tags/Tag';
import { Area as AreaComp } from './RelatedObjects/Area/Area';
import { Discipline as DisciplineComp } from './RelatedObjects/Discipline/Discipline';
import { CommPkg } from './RelatedObjects/CommPkg/CommPkg';
import { System as SystemComp } from './RelatedObjects/Systems/System';
import { StidDocument } from '../StidDocument/StidDocument';
import { Punch } from './RelatedObjects/Punch/Punch';

interface RelatedObjectsProps {
    systems: ScopeChangeSystem[];
    commPkgs: ScopeChangeCommissioningPackage[];
    tags: ScopeChangeTag[];
    areas: ScopeChangeArea[];
    disciplines: ScopeChangeDiscipline[];
    documents: ScopeChangeDocument[];
    punch: ScopeChangePunch[];
}

export const RelatedObjects = ({
    commPkgs = [],
    systems = [],
    tags = [],
    documents = [],
    disciplines = [],
    areas = [],
    punch = [],
}: RelatedObjectsProps): JSX.Element => {
    return (
        <Wrapper>
            {tags.length === 0 &&
                commPkgs.length === 0 &&
                systems.length === 0 &&
                documents.length === 0 &&
                disciplines.length === 0 &&
                punch.length === 0 &&
                areas.length === 0 && <NoReferences>No references has been linked.</NoReferences>}
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
                            <StidDocument key={x.stidDocumentNumber} docNo={x.stidDocumentNumber} />
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

            {punch && punch.length > 0 && (
                <ChevronList title={`Punch list items (${punch.length})`}>
                    <>
                        {punch.map((x) => (
                            <Punch punch={x} key={x.id} />
                        ))}
                    </>
                </ChevronList>
            )}
        </Wrapper>
    );
};

const NoReferences = styled.div`
    font-size: 14px;
    font-weight: 400;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
`;
