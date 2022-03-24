import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { isProduction, useFacility } from '../../../../../../../Core/Client/';
import { Wrapper } from '../WrapperStyles';
import { CommissioningPackage } from '../../../../../Types/scopeChangeRequest';
import { getCommPkgById } from '../../../../../Api/PCS/getCommPkgById';
import { proCoSysQueryKeys } from '../../../../../Keys/proCoSysQueryKeys';
import { useQuery } from 'react-query';
import { CacheTime } from '../../../../../../DisciplineReleaseControl/Enums/cacheTimes';
import { CommPkgIcon } from './commPkgIcon';

interface CommPkgProps {
    commPkg: CommissioningPackage;
}

export const CommPkg = ({ commPkg }: CommPkgProps): JSX.Element => {
    const { commPkg: commPkgKey } = proCoSysQueryKeys();
    const { procosysPlantId } = useFacility();

    const { data } = useQuery(
        commPkgKey(commPkg.procosysNumber),
        () => getCommPkgById(procosysPlantId, commPkg.procosysId),
        {
            cacheTime: CacheTime.TenHours,
            staleTime: CacheTime.TenHours,
        }
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
                    {commPkg.procosysNumber}
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
