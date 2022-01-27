import styled from 'styled-components';
import { CommissioningPackage, Tag, System } from '../../../Types/scopeChangeRequest';
import { ProcosSysCommPkgs } from './ProcosysCommPkg';
import { ProcosysSystem } from './ProcosysSystem';
import { ProcosysTags } from './ProcosysTag';

interface RelatedObjectsProps {
    systems?: System[];
    commPkgs?: CommissioningPackage[];
    tags?: Tag[];
    areas?: unknown[];
    disciplines?: unknown[];
}

export const RelatedObjects = ({ commPkgs, systems, tags }: RelatedObjectsProps): JSX.Element => {
    return (
        <Wrapper>
            {systems && <ProcosysSystem systems={systems} />}
            {commPkgs && <ProcosSysCommPkgs commPkgs={commPkgs} />}
            {tags && <ProcosysTags tags={tags} />}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
