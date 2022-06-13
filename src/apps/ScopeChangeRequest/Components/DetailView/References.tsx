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
import { Tag as TagComp } from './RelatedObjects/Tags/Tag';
import { Area as AreaComp } from './RelatedObjects/Area/Area';
import { Discipline as DisciplineComp } from './RelatedObjects/Discipline/Discipline';
import { CommPkg } from './RelatedObjects/CommPkg/CommPkg';
import { System as SystemComp } from './RelatedObjects/Systems/System';
import { StidDocument } from '../StidDocument/StidDocument';
import { Punch } from './RelatedObjects/Punch/Punch';
import { useState } from 'react';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { getReferenceIcon } from '../SearchReferences/getReferenceIcon';

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
                <ReferenceWrapper
                    count={tags.length}
                    text={'Tag'}
                    icon={getReferenceIcon('tag') ?? <></>}
                >
                    {tags.map((x) => (
                        <TagComp key={x.id} tag={x} />
                    ))}
                </ReferenceWrapper>
            )}
            {commPkgs && commPkgs.length > 0 && (
                <ReferenceWrapper
                    count={commPkgs.length}
                    text={'Comm Pckg'}
                    icon={getReferenceIcon('commpkg') ?? <></>}
                >
                    {commPkgs.map((x) => (
                        <CommPkg commPkg={x} key={x.id} />
                    ))}
                </ReferenceWrapper>
            )}
            {systems && systems.length > 0 && (
                <ReferenceWrapper
                    count={systems.length}
                    text={'System'}
                    icon={getReferenceIcon('system') ?? <></>}
                >
                    {systems.map((x) => (
                        <SystemComp system={x} key={x.id} />
                    ))}
                </ReferenceWrapper>
            )}

            {documents && documents.length > 0 && (
                <ReferenceWrapper
                    count={documents.length}
                    text={'Document'}
                    icon={getReferenceIcon('document') ?? <></>}
                >
                    {documents.map((x) => (
                        <StidDocument key={x.stidDocumentNumber} docNo={x.stidDocumentNumber} />
                    ))}
                </ReferenceWrapper>
            )}

            {disciplines && disciplines.length > 0 && (
                <ReferenceWrapper
                    count={disciplines.length}
                    text={'Discipline'}
                    icon={getReferenceIcon('discipline') ?? <></>}
                >
                    {disciplines.map((x) => (
                        <DisciplineComp key={x.id} discipline={x} />
                    ))}
                </ReferenceWrapper>
            )}

            {areas && areas.length > 0 && (
                <ReferenceWrapper
                    count={areas.length}
                    text={'Area'}
                    icon={getReferenceIcon('area') ?? <></>}
                >
                    {areas.map((x) => (
                        <AreaComp key={x.id} area={x} />
                    ))}
                </ReferenceWrapper>
            )}

            {punch && punch.length > 0 && (
                <ReferenceWrapper
                    count={punch.length}
                    text={'Punch'}
                    icon={getReferenceIcon('punch') ?? <></>}
                >
                    {punch.map((x) => (
                        <Punch punch={x} key={x.id} />
                    ))}
                </ReferenceWrapper>
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
`;

interface ReferenceWrapperProps {
    text: string;
    count: number;
    icon: JSX.Element;
    children: React.ReactNode;
}
const ReferenceWrapper = ({ count, icon, text, children }: ReferenceWrapperProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Container>
            <Header onClick={() => setIsExpanded((s) => !s)}>
                <Icon
                    name={isExpanded ? 'chevron_up' : 'chevron_down'}
                    color={tokens.colors.interactive.primary__resting.hex}
                />
                <div>
                    {text} ({count})
                </div>
                {icon}
            </Header>
            <ListWrapper>{isExpanded && children}</ListWrapper>
        </Container>
    );
};

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 45px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-template-columns: 1fr 10fr auto;
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 10fr auto;
    width: 100%;
    height: 48px;
    cursor: pointer;
    align-items: center;

    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: ${tokens.colors.text.static_icons__default.hex};
`;
