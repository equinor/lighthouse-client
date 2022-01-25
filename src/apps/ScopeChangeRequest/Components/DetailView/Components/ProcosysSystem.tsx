import styled from 'styled-components';
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
                        // href={`https://procosys.equinor.com/JOHAN_CASTBERG/Completion#Tag|${x.procosysId}`}
                        // target="_blank"
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
`;
// text-decoration: none;
// color: ${tokens.colors.interactive.primary__resting.hex};

const SystemWrapper = styled.div`
    display: flex;
    font-size: 16px;
    height: 16px;
    justify-content: space-between;
    align-items: center;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Spacer = styled.div`
    width: 5px;
`;
