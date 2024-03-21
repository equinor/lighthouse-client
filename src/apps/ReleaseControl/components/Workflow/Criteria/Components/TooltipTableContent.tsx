import { useQuery } from 'react-query';
import { getPersonsInRole } from '../../../../api/releaseControl/Request/getPersonsInRole';
import { getPersonByAzureOid } from '../../../../api/releaseControl/Request/getPersonByAzureOid';
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
        ? getPersonsInRole(props.criteria.value)
        : getPersonByAzureOid(props.criteria.value));
      return result;
    },
  });

  if (error) {
    const toolTipData = `Step: ${props.stepName} 
Role: ${props.criteria.value} 
No people in this role`;

    return <StyledPersonInfoTooltip>{toolTipData}</StyledPersonInfoTooltip>;
  }
  const tooltipData = `Step: ${props.stepName}
Role: ${props.criteria.valueDescription}
People in this role: ${data}`;
  return (
    <StyledPersonInfoTooltip>
      {!isLoading ? tooltipData : <DotProgress size={32}></DotProgress>}
    </StyledPersonInfoTooltip>
  );
}
