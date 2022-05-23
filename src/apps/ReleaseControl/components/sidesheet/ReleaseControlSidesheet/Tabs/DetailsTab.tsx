import styled from 'styled-components';
import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';
import { Workflow } from '../../../Workflow/Workflow';

export const DetailsTab = (): JSX.Element => {
    const { description, dueDate } = useReleaseControlContext(({ releaseControl }) => ({
        dueDate: new Date(releaseControl.plannedDueDate),
        description: releaseControl.description,
    }));

    return (
        <Wrapper>
            <FormWrapper>
                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>Details</SectionHeading>

                        <SectionWrapper>
                            <SubSectionTitle>Description</SubSectionTitle>
                            <SubSectionText>{description}</SubSectionText>
                        </SectionWrapper>
                        <SectionWrapper>
                            <SubSectionTitle>Due date</SubSectionTitle>
                            <SubSectionText>{dueDate.toLocaleDateString('en-gb')}</SubSectionText>
                        </SectionWrapper>

                        <SectionHeading>References</SectionHeading>
                        <SectionWrapper>
                            <SubSectionText>
                                <div>No references added.</div>
                            </SubSectionText>
                        </SectionWrapper>
                    </InnerSection>
                </FlexColumn>
                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>Workflow</SectionHeading>
                        <SectionWrapper>
                            <Workflow />
                        </SectionWrapper>
                    </InnerSection>
                </FlexColumn>
            </FormWrapper>
        </Wrapper>
    );
};

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 44px;
`;

export const FlexColumn = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 44px;
    max-width: 600px;
`;

export const FormWrapper = styled.form`
    display: grid;
    grid-column: 2;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2em;
`;

export const InnerSection = styled.span`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

export const SectionHeading = styled.div`
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
`;

export const SubSectionText = styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    white-space: break-spaces;
`;

export const SubSectionTitle = styled.div`
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: left;
`;

export const SectionWrapper = styled.div`
    margin-left: 5px;
`;
