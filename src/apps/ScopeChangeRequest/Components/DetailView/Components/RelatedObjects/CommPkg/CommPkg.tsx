import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { isProduction } from '../../../../../../../Core/Client/';
import { Wrapper } from '../WrapperStyles';
import { CommissioningPackage } from '../../../../../Types/scopeChangeRequest';
import { getCommPkgById } from '../../../../../Api/PCS/getCommPkgById';
import { useInfiniteCachedQuery } from '../../../../../Hooks/React-Query/useInfiniteCachedQuery';
import { proCoSysQueryKeys } from '../../../../../Keys/proCoSysQueryKeys';
import { CommPkgIcon } from './commPkgIcon';

interface CommPkgProps {
    commPkg: CommissioningPackage;
}

export const CommPkg = ({ commPkg }: CommPkgProps): JSX.Element => {
    const { commPkg: commPkgKey } = proCoSysQueryKeys();

    const { data } = useInfiniteCachedQuery(commPkgKey(commPkg.procosysNumber), () =>
        getCommPkgById(commPkg.procosysId)
    );

    return (
        <Wrapper key={commPkg.procosysId}>
            <CommPkgIcon />
            <TagText>
                <Link
                    href={`https://${isProduction() ? 'procosys' : 'procosystest'
                        }.equinor.com/JOHAN_CASTBERG/Completion#CommPkg|${commPkg.procosysId}`}
                    target="_blank"
                >
                    COMM_{commPkg.procosysNumber}
                </Link>
                -<div>{data?.Description}</div>
            </TagText>
        </Wrapper>
    );
};

const TagText = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.2em;
`;

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
