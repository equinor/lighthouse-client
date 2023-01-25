import { ScopeChangeCommissioningPackage } from '../../../../types/scopeChangeRequest';
import { useQuery } from 'react-query';
import { Link, Wrapper, TextWrapper, MainText } from '../WrapperStyles';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { CommissioningPackage, proCoSysQueries } from '@equinor/Workflow';
import { useFacility } from '@equinor/lighthouse-portal-client';
interface CommPkgProps {
    commPkg: ScopeChangeCommissioningPackage;
}

export const CommPkg = ({ commPkg }: CommPkgProps): JSX.Element => {
    const { procosysPlantId } = useFacility();

    const { getCommPkgByCodeQuery } = proCoSysQueries;

    const { data } = useQuery<unknown, unknown, CommissioningPackage>(
        getCommPkgByCodeQuery(commPkg.procosysId, procosysPlantId)
    );

    return (
        <Wrapper
            onClick={() => window.open(proCoSysUrls.getCommPkgUrl(commPkg.procosysId), '_blank')}
            key={commPkg.procosysId}
        >
            <TextWrapper>
                <MainText>
                    <Link>{commPkg.procosysNumber}</Link>-<div>{data?.Description}</div>
                </MainText>
            </TextWrapper>
        </Wrapper>
    );
};
