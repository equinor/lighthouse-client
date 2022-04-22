import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { isProduction, useFacility } from '../../../../../../Core/Client';
import { Wrapper } from '../WrapperStyles';
import { ScopeChangeCommissioningPackage } from '../../../../types/scopeChangeRequest';
import { CommPkgIcon } from './commPkgIcon';
import { ProCoSysQueries } from '../../../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';
import { CommissioningPackage } from '../../../../types/ProCoSys/CommissioningPackage';

interface CommPkgProps {
    commPkg: ScopeChangeCommissioningPackage;
}

export const CommPkg = ({ commPkg }: CommPkgProps): JSX.Element => {
    const { procosysPlantId } = useFacility();

    const { getCommPkgByCodeQuery } = ProCoSysQueries;

    const { data } = useQuery<unknown, unknown, CommissioningPackage>(
        getCommPkgByCodeQuery(commPkg.procosysId, procosysPlantId)
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
                -<div>{data?.Description}</div>
            </CommPkgText>
        </Wrapper>
    );
};

const CommPkgText = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.2em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
