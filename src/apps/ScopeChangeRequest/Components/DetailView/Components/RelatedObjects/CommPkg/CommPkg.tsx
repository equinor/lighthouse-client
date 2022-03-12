import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { isProduction } from '../../../../../../../Core/Client/';
import { Wrapper } from '../WrapperStyles';
import { Icon } from '@equinor/eds-core-react';
import { CommissioningPackage } from '../../../../../Types/scopeChangeRequest';
import { getCommPkgById } from '../../../../../Api/PCS/getCommPkgById';
import { proCoSysQueryKeys } from '../../../../../Keys/proCoSysQueryKeys';
import { useQuery } from 'react-query';
import { CacheTime } from '../../../../../../DisciplineReleaseControl/Enums/cacheTimes';

interface CommPkgProps {
    commPkg: CommissioningPackage;
}

export const CommPkg = ({ commPkg }: CommPkgProps): JSX.Element => {
    const { commPkg: commPkgKey } = proCoSysQueryKeys();

    const { data } = useQuery(
        commPkgKey(commPkg.procosysNumber),
        () => getCommPkgById(commPkg.procosysId),
        {
            cacheTime: CacheTime.TenHours,
            staleTime: CacheTime.TenHours,
        }
    );

    return (
        <Wrapper key={commPkg.procosysId}>
            <Icon name="placeholder_icon" />
            <TagText>
                <Link
                    href={`https://${
                        isProduction() ? 'procosys' : 'procosystest'
                    }.equinor.com/JOHAN_CASTBERG/Completion#CommPkg|${commPkg.procosysId}`}
                    target="_blank"
                >
                    COMM_{commPkg.procosysNumber}
                </Link>
                -
                <div>
                    {data?.Description} {data?.CommPkgNo}
                </div>
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
