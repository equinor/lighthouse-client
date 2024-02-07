import { Workflow } from '../../../Workflow/Workflow';
import {
    FormWrapper,
    InnerSection,
    SectionHeading,
    SectionWrapper,
    StyledFlexColumnWorkflowTab,
    Wrapper,
    WrapperFillerDiv,
} from '../sidesheetStyles';

export const WorkflowTab = (): JSX.Element => {
    return (
        <Wrapper>
            <FormWrapper>
                <StyledFlexColumnWorkflowTab>
                    <InnerSection>
                        <SectionHeading>Workflow</SectionHeading>
                        <SectionWrapper>
                            <Workflow />
                        </SectionWrapper>
                    </InnerSection>
                </StyledFlexColumnWorkflowTab>
            </FormWrapper>
            <WrapperFillerDiv />
        </Wrapper>
    );
};
