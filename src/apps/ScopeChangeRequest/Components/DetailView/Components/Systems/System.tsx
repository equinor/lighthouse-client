import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { System as SystemInterface } from '../../../../Types/scopeChangeRequest';
import { isProduction } from '../../../../../../Core/Client/';

interface SystemProps {
    system: SystemInterface;
}

export const System = ({ system }: SystemProps): JSX.Element => {
    return (
        <TagWrapper key={system.id}>
            <Link
                href={`https://${isProduction() ? 'procosys' : 'procosystest'
                    }.equinor.com/JOHAN_CASTBERG/Completion#System|${system.procosysId}`}
                target="_blank"
            >
                SYS_{system.procosysCode}
            </Link>
        </TagWrapper>
    );
};

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;

const TagWrapper = styled.div`
    display: flex;
    font-size: 16px;
    height: 16px;
    justify-content: space-between;
    align-items: center;
    color: ${tokens.colors.interactive.primary__resting.hex};
    margin: 0.2rem 0rem;
`;
