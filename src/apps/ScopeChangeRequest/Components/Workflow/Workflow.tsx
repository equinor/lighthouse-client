import { Fragment } from 'react';
import { useScopeChangeContext } from '../../hooks/context/useScopeChangeContext';
import { CriteriaRender } from './Criteria/Components/Criteria';
import { getCriteriaStatus } from './Utils/getCriteriaStatus';

export const Workflow = (): JSX.Element => {
    const { request } = useScopeChangeContext();

    return (
        <div>
            {request.workflowSteps.map(
                ({ criterias, contributors, name, order, isCurrent, id }, stepIndex) => (
                    <Fragment key={id}>
                        {criterias.map((criteria, index) => (
                            <CriteriaRender
                                stepId={id}
                                key={criteria.id}
                                contributors={contributors}
                                criteria={criteria}
                                isLastCriteria={criterias.length - 1 === index}
                                name={name}
                                order={order}
                                stepIndex={stepIndex}
                                stepStatus={getCriteriaStatus(criteria, isCurrent)}
                            />
                        ))}
                    </Fragment>
                )
            )}
        </div>
    );
};
