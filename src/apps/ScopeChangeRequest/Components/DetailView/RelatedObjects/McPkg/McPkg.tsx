import { proCoSysQueries } from '../../../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';
import { McPkg as McPkgType } from '../../../../types/ProCoSys/McPkg';
import { Link, Wrapper, TextWrapper, MainText } from '../WrapperStyles';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { ScopeChangeMcPkg } from '../../../../types/scopeChangeRequest';

interface McPkgProps {
    mcPkg: ScopeChangeMcPkg;
}

export const McPkg = ({ mcPkg }: McPkgProps): JSX.Element => {
    const { procosysPlantId } = useFacility();

    const { getMcPkgByCodeQuery } = proCoSysQueries;

    const { data } = useQuery<unknown, unknown, McPkgType>(
        getMcPkgByCodeQuery(mcPkg.procosysId, procosysPlantId)
    );

    return (
        <Wrapper
            onClick={() => window.open(proCoSysUrls.getMcUrl(mcPkg.procosysId), '_blank')}
            key={mcPkg.procosysId}
        >
            <TextWrapper>
                <MainText>
                    <Link>{mcPkg.procosysNumber}</Link>-<div>{data?.Description}</div>
                </MainText>
            </TextWrapper>
        </Wrapper>
    );
};
