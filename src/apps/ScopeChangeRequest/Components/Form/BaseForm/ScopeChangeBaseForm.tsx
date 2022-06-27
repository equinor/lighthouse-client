import styled from 'styled-components';

import { OriginIdPicker } from '../Inputs/OriginIdPicker/OriginIdPicker';
import { IsWarrantyCaseCheckbox } from '../Inputs/IsWarrantyCheckbox/IsWarrantyCheckbox';
import { TitleInput } from '../Inputs/TitleInput/TitleInput';
import { DescriptionInput } from '../Inputs/DescriptionInput/DescriptionInput';
import { OriginSourceSelect } from '../Inputs/OriginSourceSelect/OriginSourceSelect';

export const ScopeChangeBaseForm = (): JSX.Element => {
    return (
        <BaseFormContainer>
            <TitleInput />
            <Section>
                <OriginSourceSelect />
                <OriginIdPicker />
            </Section>
            <DescriptionInput />
            <CheckboxWrapper>
                <IsWarrantyCaseCheckbox />
            </CheckboxWrapper>
        </BaseFormContainer>
    );
};

const CheckboxWrapper = styled.div`
    margin-left: -14px;
    font-size: 14px;
    line-height: 16px;
    text-align: left;
    display: flex;
    align-items: center;
`;

const BaseFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: flex-end;
`;
