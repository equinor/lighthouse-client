import { HotUpload } from '../../../Attachments/HotUpload';
import { Attachments } from '../../../DetailView/Attachments';
import { RelatedObjects } from '../../../DetailView/References';
import { Workflow } from '../../../Workflow/Components/Workflow';
import { useScopeChangeContext } from '../../../../context/useScopeChangeAccessContext';
import {
    FlexColumn,
    FormWrapper,
    InnerSection,
} from '../../SidesheetWrapper/SidesheetWrapper.styles';
import { Description, SectionHeading, Wrapper } from './RequestTab.styles';

export function RequestTab(): JSX.Element {
    const { request, requestAccess } = useScopeChangeContext();

    return (
        <Wrapper>
            <FormWrapper>
                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>Description</SectionHeading>

                        <Description>{request.description}</Description>
                    </InnerSection>
                </FlexColumn>
                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>Workflow</SectionHeading>

                        <Workflow />
                    </InnerSection>
                </FlexColumn>

                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>References</SectionHeading>

                        <RelatedObjects
                            systems={request.systems}
                            commPkgs={request.commissioningPackages}
                            documents={request.documents}
                            areas={request.areas}
                            disciplines={request.disciplines}
                            tags={request.tags}
                        />
                    </InnerSection>
                    <InnerSection>
                        <SectionHeading>Attachments</SectionHeading>

                        {requestAccess.canPatch && <HotUpload />}
                        <Attachments attachments={request.attachments} requestId={request.id} />
                    </InnerSection>
                </FlexColumn>
            </FormWrapper>
        </Wrapper>
    );
}
