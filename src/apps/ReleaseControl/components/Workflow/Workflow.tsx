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
                ({ criterias, contributors, name, order, isCurrent, id }, stepIndex) => (
                    <Fragment key={id}>
                        {criterias?.map((criteria, index) => (
                            <CriteriaRender
                                stepId={id ?? ''}
                                key={criteria.id}
                                contributors={contributors ?? []}
                                criteria={criteria}
                                isLastCriteria={criterias.length - 1 === index}
                                name={name}
                                order={order}
                                stepIndex={stepIndex}
                                stepStatus={getCriteriaStatus(criteria, isCurrent ?? false)}
                            />
                        ))}
                    </Fragment>
                )
            )}
        </div>
    );
};
