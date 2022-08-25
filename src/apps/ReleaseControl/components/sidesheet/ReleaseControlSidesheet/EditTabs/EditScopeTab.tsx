import {
    DescriptionInput,
    PlannedDueDateInput,
    ReferencesInput,
    TitleInput,
} from '../../../Form/Inputs';
import { HtCablesInput } from '../../../Form/Inputs/Scope/HtCables';
import { TagsInput } from '../../../Form/Inputs/Scope/Tags';
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
