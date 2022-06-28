import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';
import { HtCableTable } from '../../../Form/Inputs/Scope/HtCableTable';
import { TagTable } from '../../../Form/Inputs/Scope/TagTable';
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
    const { description, dueDate, tags, htCables, documents, punchList } = useReleaseControlContext(
        ({ releaseControl }) => ({
            dueDate: new Date(releaseControl.plannedDueDate),
            description: releaseControl.description,
            tags: releaseControl.scopeTags,
            htCables: releaseControl.scopeHTTags,
            documents: releaseControl.documents,
            punchList: releaseControl.punchList,
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

                        <SectionHeading>Scope</SectionHeading>
                        <SectionWrapper>
                            <SubSectionText>
                                <SubSectionTitle>
                                    Tags involved in this release control scope
                                </SubSectionTitle>
                                <TagTable tags={tags ?? []} />
                            </SubSectionText>
                            <SubSectionText>
                                <SubSectionTitle>Related HT cables</SubSectionTitle>
                                <HtCableTable htCables={htCables ?? []} />
                            </SubSectionText>
                        </SectionWrapper>

                        <SectionHeading>References</SectionHeading>
                        <SectionWrapper>
                            <SubSectionText>
                                <ReferencesList documents={documents} punchList={punchList} />
                            </SubSectionText>
                        </SectionWrapper>
                    </InnerSection>
                </FlexColumn>
            </FormWrapper>
        </Wrapper>
    );
};
