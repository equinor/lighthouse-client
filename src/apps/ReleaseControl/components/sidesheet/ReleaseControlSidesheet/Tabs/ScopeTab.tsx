import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';
import { ReferencesList } from '../../../RelatedObjects/ReferencesList';
import {
    FlexColumn,
    FormWrapper,
    InnerSection,
    SectionHeading,
    SectionWrapper,
    SubSectionText,
    SubSectionTitle,
    Wrapper,
} from '../sidesheetStyles';

export const ScopeTab = (): JSX.Element => {
    const { description, dueDate, tags, areas } = useReleaseControlContext(
        ({ releaseControl }) => ({
            dueDate: new Date(releaseControl.plannedDueDate),
            description: releaseControl.description,
            tags: releaseControl.tags,
            areas: releaseControl.areas,
        })
    );

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
                                <ReferencesList areas={areas} tags={tags} />{' '}
                            </SubSectionText>
                        </SectionWrapper>
                    </InnerSection>
                </FlexColumn>
            </FormWrapper>
        </Wrapper>
    );
};
