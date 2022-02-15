import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { isProduction } from '../../../../../../../Core/Client/';
import { Wrapper } from '../WrapperStyles';
import { Icon } from '@equinor/eds-core-react';
import { CommissioningPackage } from '../../../../../Types/scopeChangeRequest';

interface CommPkgProps {
    commPkg: CommissioningPackage;
}

export const CommPkg = ({ commPkg }: CommPkgProps): JSX.Element => {
    return (
        <Wrapper key={commPkg.procosysId}>
            <Icon name="placeholder_icon" />
            <Link
                href={`https://${isProduction() ? 'procosys' : 'procosystest'
                    }.equinor.com/JOHAN_CASTBERG/Completion#CommPkg|${commPkg.procosysId}`}
                target="_blank"
            >
                COMM_{commPkg.procosysNumber}
            </Link>
        </Wrapper>
    );
};

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
