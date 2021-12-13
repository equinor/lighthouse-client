import styled from 'styled-components';
import { Field } from './Components/Field';
import { Attachments } from './Components/Attachments';
// import { Documents } from './Components/Documents';
// import { Tags } from './Components/Tags';
import { SectionRow } from '../../Styles/Section';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { Workflow } from '../Workflow/Workflow';
import { WorkflowStep } from '../../Types/scopeChangeRequest';

interface RequestDetailViewProps {
    request: ScopeChangeRequest;
}

const statusDotFunc = (item: WorkflowStep) => {
    if (item.isCurrent) {
        return 'Active';
    }

    switch (item.isCompleted) {
        case true:
            return 'Completed';

        case false:
            return 'Inactive';
    }
};

export const RequestDetailView = ({ request }: RequestDetailViewProps): JSX.Element => {
    return (
        <div>
            <DetailViewContainer>
                <Field label={'Title'} value={request.title} />
                <SectionRow>
                    <Field label={'Phase'} value={request.phase} />
                    <Field label={'Status'} value={request.state} />
                </SectionRow>
                <SectionRow>
                    <Field label={'Change category'} value={request.category} />
                    <Field label={'Change origin'} value={request.origin} />
                    {/* <Field label={'Change origin'} value={request.origin} /> */}
                </SectionRow>
                <Field label={'Description'} value={request.description} />
                <Field
                    customLabel={{ bold: true, fontSize: 'xx-large' }}
                    label={'Attachments'}
                    value={<Attachments />}
                />

                {/* <Field
                    customLabel={{ bold: true, fontSize: 'xx-large' }}
                    label={'Workflow'}
                    value={
                        <Workflow
                            statusDotFunc={statusDotFunc}
                            steps={request.workflowSteps}
                            stepName={'name'}
                            spanDirection={'vertical'}
                        />
                    }
                />
                <Field label={'Active step'} value={request.currentWorkflowStep.name} /> */}
            </DetailViewContainer>
        </div>
    );
};

const DetailViewContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
