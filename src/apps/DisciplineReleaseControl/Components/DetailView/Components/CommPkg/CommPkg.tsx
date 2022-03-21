import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { isProduction } from '../../../../../../Core/Client/';
import { CommissioningPackage } from '../../../../Types/disciplineReleaseControl';

interface CommPkgProps {
    commPkg: CommissioningPackage;
}

export const CommPkg = ({ commPkg }: CommPkgProps): JSX.Element => {
    return (
        <TagWrapper key={commPkg.id}>
            <Link
                href={`https://${isProduction() ? 'procosys' : 'procosystest'
                    }.equinor.com/JOHAN_CASTBERG/Completion#CommPkg|${commPkg.procosysId}`}
                target="_blank"
            >
                COMM_{commPkg.procosysNumber}
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
