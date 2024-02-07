import { CircularProgress } from '@equinor/eds-core-react';
import { useGetReleaseControl } from '../../../../hooks/useGetReleaseControl';
import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';
import { Attachments } from '../../../Attachments/AttachmentsView';
import { HotUpload } from '../../../Attachments/HotUpload';
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
    WrapperFillerDiv,
} from '../sidesheetStyles';

export const ScopeTab = (): JSX.Element => {
    const {
        description,
        dueDate,
        tags,
        htCables,
        documents,
        punchListItems,
        id,
        attachments,
        scopeChangeRequestReferences,
    } = useReleaseControlContext(({ releaseControl }) => ({
        dueDate: new Date(releaseControl.plannedDueDate),
        description: releaseControl.description,
        tags: releaseControl.scopeTags,
        htCables: releaseControl.scopeHTTags,
        documents: releaseControl.documents,
        punchListItems: releaseControl.punchListItems,
        id: releaseControl.id,
        attachments: releaseControl.attachments,
        scopeChangeRequestReferences: releaseControl.scopeChangeRequestReferences,
    }));

    const { isLoading } = useGetReleaseControl(id);
    const { requestAccess } = useReleaseControlContext();

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
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <>
                                <SectionWrapper>
                                    {tags?.length === 0 && htCables?.length === 0 && (
                                        <NoScope>
                                            Nothing has been added to the scope of this release
                                            control
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
                            </>
                        )}

                        <SectionHeading>References</SectionHeading>
                        <SectionWrapper>
                            <SubSectionText>
                                <ReferencesList
                                    documents={documents}
                                    punchListItems={punchListItems}
                                    scopeChangeRequestReferences={scopeChangeRequestReferences}
                                />
                            </SubSectionText>
                        </SectionWrapper>
                        <SectionHeading>Attachments</SectionHeading>
                        {requestAccess.canPatch && <HotUpload />}
                        <Attachments attachments={attachments} releaseControlId={id} />
                    </InnerSection>
                </FlexColumn>
            </FormWrapper>
            <WrapperFillerDiv />
        </Wrapper>
    );
};
