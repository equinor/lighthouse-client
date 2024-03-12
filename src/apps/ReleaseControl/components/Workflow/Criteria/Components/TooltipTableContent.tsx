import { useQuery } from 'react-query';
import { getPersonsInrole } from '../../../../api/releaseControl/Request/getPersonsInRole';
import { getPersonByAzureOid } from '../../../../api/releaseControl/Request/getPersonByEmail';
import { CacheTime } from '@equinor/Workflow';
import { DotProgress } from '@equinor/eds-core-react';
import { StyledPersonInfoTooltip } from './criteria.styles';
import { Criteria } from '../../../../types/releaseControl';

export type TooltipProps = {
    criteria: Criteria;
    stepName?: string;
};

export function TooltipTableContent(props: TooltipProps): JSX.Element {
    const { data, isLoading, error } = useQuery({
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.TenHours,
        queryKey: ['assignee', props.criteria.value],
        queryFn: async () => {
            const result = await (props.criteria.type == 'RequireProcosysFunctionalRoleSignature'
                ? getPersonsInrole(props.criteria.value)
                : getPersonByAzureOid(props.criteria.value));
            return result;
        },
    });

    if (error) {
        const toolTipData =
            'Step: ' +
            props.stepName +
            '\nRole: ' +
            props.criteria.value +
            '\nNo people in this role';
        return <StyledPersonInfoTooltip>{toolTipData}</StyledPersonInfoTooltip>;
    }
    const tooltipData =
        'Step: ' +
        props.stepName +
        '\nRole: ' +
        props.criteria.valueDescription +
        '\nPeople in this role: ' +
        data;
    return (
        <StyledPersonInfoTooltip>
            {!isLoading ? tooltipData : <DotProgress size={32}></DotProgress>}
        </StyledPersonInfoTooltip>
    );
}
