import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';
import { HtCableTable } from '../../../Form/Inputs/Scope/HtCableTable';
import { TagTable } from '../../../Form/Inputs/Scope/TagTable';
import { ReferencesList } from '../../../RelatedObjects/ReferencesList';
import {
    FlexColumn,
    FormWrapper,
    InnerSection,
    NoScope,
    SectionHeading,
    SectionWrapper,
    SubSectionText,
    SubSectionTitle,
    Wrapper,
} from '../sidesheetStyles';

export const ScopeTab = (): JSX.Element => {
    const { description, dueDate, tags, htCables, documents, punchListItems } =
        useReleaseControlContext(({ releaseControl }) => ({
            dueDate: new Date(releaseControl.plannedDueDate),
            description: releaseControl.description,
            tags: releaseControl.scopeTags,
            htCables: releaseControl.scopeHTTags,
            documents: releaseControl.documents,
            punchListItems: releaseControl.punchListItems,
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

                        <SectionHeading>Scope</SectionHeading>
                        <SectionWrapper>
                            {tags?.length === 0 && htCables?.length === 0 && (
                                <NoScope>
                                    Nothing has been added to the scope of this release control
                                </NoScope>
                            )}
                            <SubSectionText>
                                <SubSectionTitle>
                                    {tags?.length !== 0 &&
                                        'Tags involved in this release control scope'}
                                </SubSectionTitle>
                                <TagTable tags={tags ?? []} editMode={false} />
                            </SubSectionText>
                            <SubSectionText>
                                <SubSectionTitle>
                                    {htCables?.length !== 0 && 'HT cables'}
                                </SubSectionTitle>
                                <HtCableTable htCables={htCables ?? []} editMode={false} />
                            </SubSectionText>
                        </SectionWrapper>

                        <SectionHeading>References</SectionHeading>
                        <SectionWrapper>
                            <SubSectionText>
                                <ReferencesList
                                    documents={documents}
                                    punchListItems={punchListItems}
                                />
                            </SubSectionText>
                        </SectionWrapper>
                    </InnerSection>
                </FlexColumn>
            </FormWrapper>
        </Wrapper>
    );
};
