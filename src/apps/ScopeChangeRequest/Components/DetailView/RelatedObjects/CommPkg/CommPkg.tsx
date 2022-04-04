import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { isProduction, useFacility } from '../../../../../../Core/Client';
import { Wrapper } from '../WrapperStyles';
import { ScopeChangeCommissioningPackage } from '../../../../types/scopeChangeRequest';
import { getCommPkgById } from '../../../../api/PCS/getCommPkgById';
import { proCoSysQueryKeys } from '../../../../sKeys/proCoSysQueryKeys';
import { CommPkgIcon } from './commPkgIcon';
import { useInfiniteCachedQuery } from '../../../../hooks/react-Query/useInfiniteCachedQuery';

interface CommPkgProps {
    commPkg: ScopeChangeCommissioningPackage;
}

export const CommPkg = ({ commPkg }: CommPkgProps): JSX.Element => {
    const { commPkg: commPkgKey } = proCoSysQueryKeys();
    const { procosysPlantId } = useFacility();

    const { data } = useInfiniteCachedQuery(commPkgKey(commPkg.procosysNumber), () =>
        getCommPkgById(procosysPlantId, commPkg.procosysId)
    );

    return (
        <Wrapper key={commPkg.procosysId}>
            <CommPkgIcon />
            <CommPkgText>
                <Link
                    href={`https://${isProduction() ? 'procosys' : 'procosystest'
                        }.equinor.com/JOHAN_CASTBERG/Completion#CommPkg|${commPkg.procosysId}`}
                    target="_blank"
                >
                    {commPkg.procosysNumber}
                </Link>
                -
                <div>
                    {data?.Description} {data?.CommPkgNo}
                </div>
            </CommPkgText>
        </Wrapper>
    );
};

const CommPkgText = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.2em;
`;

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
