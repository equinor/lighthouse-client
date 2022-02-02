import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { isProduction } from '../../../../../Core/Client/Functions';
import { System } from '../../../Types/scopeChangeRequest';

interface ProcosysSystemProps {
    systems: System[];
}

export const ProcosysSystem = ({ systems: systems }: ProcosysSystemProps): JSX.Element => {
    return (
        <Wrapper>
            {systems &&
                systems.map((x) => (
                    <SystemWrapper key={x.id}>
                        {/* TODO: Find system icon */}
                        <Spacer />
                        <Link
                            href={`https://${isProduction() ? 'procosys' : 'procosystest'
                                }.com/JOHAN_CASTBERG/Completion#System|${x.procosysId}`}
                            target="_blank"
                        >
                            SYS_{x.procosysCode}
                        </Link>
                    </SystemWrapper>
                ))}
        </Wrapper>
    );
};

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;

const SystemWrapper = styled.div`
    display: flex;
    font-size: 16px;
    height: 16px;
    justify-content: space-between;
    align-items: center;
    margin: 0.2rem;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Spacer = styled.div`
    width: 5px;
`;
