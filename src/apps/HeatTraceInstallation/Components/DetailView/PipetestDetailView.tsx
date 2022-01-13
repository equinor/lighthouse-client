import styled from 'styled-components';
import { Field } from '../../../../packages/Form/src/Components/Field';
import { SectionRow } from '../../../../packages/Form/src/Styles/Section';
import { Pipetest } from '../../Types/Pipetest';

interface PipetestDetailViewProps {
    pipetest: Pipetest;
}

export const PipetestDetailView = ({ pipetest }: PipetestDetailViewProps): JSX.Element => {
    return (
        <div>
            <DetailViewContainer>
                <Field label={'Name'} value={pipetest.name} />
                <SectionRow>
                    <Field label={'Description'} value={pipetest.description} />
                </SectionRow>
            </DetailViewContainer>
        </div>
    );
};

const DetailViewContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
