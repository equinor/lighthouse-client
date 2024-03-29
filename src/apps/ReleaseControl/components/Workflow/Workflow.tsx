import { Fragment } from 'react';
import { useReleaseControlContext } from '../../hooks/useReleaseControlContext';
import { CriteriaRender } from './Criteria/Components/Criteria';
import { getCriteriaStatus } from './Utils/getCriteriaStatus';

export const Workflow = (): JSX.Element => {
  const workflowSteps = useReleaseControlContext(
    ({ releaseControl }) => releaseControl.workflowSteps
  );

  return (
    <div>
      {workflowSteps.map(
        (
          { criterias, contributors, description, isCompleted, name, order, isCurrent, id },
          stepIndex
        ) => (
          <Fragment key={id}>
            {criterias?.map((criteria, index) => (
              <CriteriaRender
                isStepCompleted={isCompleted ?? false}
                stepId={id ?? ''}
                key={criteria.id}
                contributors={contributors ?? []}
                description={description ?? null}
                criteria={criteria}
                isLastCriteria={criterias.length - 1 === index}
                name={name}
                order={order}
                stepIndex={stepIndex}
                stepStatus={getCriteriaStatus(criteria, isCurrent ?? false)}
                hideOptions={false}
              />
            ))}
          </Fragment>
        )
      )}
    </div>
  );
};
