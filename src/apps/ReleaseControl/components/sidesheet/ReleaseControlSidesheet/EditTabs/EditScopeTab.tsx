import { HotUpload } from '../../../Attachments/HotUpload';
import { RequestAttachmentsList } from '../../../Attachments/RequestAttachmentsList/RequestAttachmentsList';
import {
    DescriptionInput,
    HtCablesInput,
    PlannedDueDateInput,
    ReferencesInput,
    TagsInput,
    TitleInput,
} from '../../../Form/Inputs';
import { FlexColumn, FormWrapper } from '../../../Form/releaseControlProcessForm.styles';
import { Wrapper, WrapperFillerDiv } from '../sidesheetStyles';
import { EditButtonBar } from './EditButtonBar';

export const EditScopeTab = (): JSX.Element => {
    return (
        <Wrapper>
            <FormWrapper>
                <FlexColumn>
                    General info
                    <TitleInput />
                    <DescriptionInput />
                    <PlannedDueDateInput />
                    <TagsInput />
                    <HtCablesInput />
                    <ReferencesInput />
                    Attachments
                    <HotUpload />
                    <RequestAttachmentsList />
                </FlexColumn>
            </FormWrapper>
            <WrapperFillerDiv />
            <EditButtonBar />
        </Wrapper>
    );
};
