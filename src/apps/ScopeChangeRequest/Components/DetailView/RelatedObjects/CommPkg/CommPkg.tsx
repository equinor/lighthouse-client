import { isProduction, useFacility } from '../../../../../../Core/Client';
import { ScopeChangeCommissioningPackage } from '../../../../types/scopeChangeRequest';
import { proCoSysQueries } from '../../../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';
import { CommissioningPackage } from '../../../../types/ProCoSys/CommissioningPackage';
import { Link, Wrapper, TextWrapper, MainText } from '../WrapperStyles';
import { getReferenceIcon } from '../../../SearchReferences/getReferenceIcon';
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
            onClick={() =>
                window.open(
                    `https://${isProduction() ? 'procosys' : 'procosystest'
                    }.equinor.com/JOHAN_CASTBERG/Completion#CommPkg|${commPkg.procosysId}`,
                    '_blank'
                )
            }
            key={commPkg.procosysId}
        >
            {getReferenceIcon('commpkg')}
            <TextWrapper>
                <MainText>
                    <Link>{commPkg.procosysNumber}</Link>-<div>{data?.Description}</div>
                </MainText>
            </TextWrapper>
        </Wrapper>
    );
};
