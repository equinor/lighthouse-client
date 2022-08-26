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

import { EditButtonBar } from './EditButtonBar';

export const EditScopeTab = (): JSX.Element => {
    return (
        <>
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
            <EditButtonBar />
        </>
    );
};
