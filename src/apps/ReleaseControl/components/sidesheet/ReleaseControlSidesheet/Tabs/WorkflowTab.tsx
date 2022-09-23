import { Workflow } from '../../../Workflow/Workflow';
import {
    FlexColumn,
    FormWrapper,
    InnerSection,
    SectionHeading,
    SectionWrapper,
    Wrapper,
    WrapperFillerDiv,
} from '../sidesheetStyles';

export const WorkflowTab = (): JSX.Element => {
    return (
        <Wrapper>
            <FormWrapper>
                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>Workflow</SectionHeading>
                        <SectionWrapper>
                            <Workflow />
                        </SectionWrapper>
                    </InnerSection>
                </FlexColumn>
            </FormWrapper>
            <WrapperFillerDiv />
        </Wrapper>
    );
};
