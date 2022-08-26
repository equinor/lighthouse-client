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
                </FlexColumn>
            </FormWrapper>
            <EditButtonBar />
        </>
    );
};
