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
export function TooltipSidesheetContent(props: TooltipProps) {
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
        return (
            <StyledPersonInfoTooltip>
                This group does not contain any people
            </StyledPersonInfoTooltip>
        );
    }

    return (
        <StyledPersonInfoTooltip>
            {!isLoading ? data : <DotProgress size={32}></DotProgress>}
        </StyledPersonInfoTooltip>
    );
}
