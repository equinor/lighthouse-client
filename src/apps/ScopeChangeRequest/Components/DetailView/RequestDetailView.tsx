import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useDataContext } from '../../../../Core/WorkSpace/src/Context/DataProvider';
import { SectionRow } from '../../Styles/Section';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { Field } from './Components/Field';

interface RequestDetailViewProps {
    request: ScopeChangeRequest;
    setEditMode: () => void;
}

export const RequestDetailView = ({
    request,
    setEditMode,
}: RequestDetailViewProps): JSX.Element => {
    const { getData } = useDataContext();
    const onInitiate = () => {
        const payLoad = {
            ...request,
            setAsOpen: true,
        };
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payLoad),
        };
        fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${request.id}`,
            requestOptions
        );
        setTimeout(getData, 200);
    };

    return (
        <div>
            <DetailViewContainer>
                <Field label={'Title'} value={request.title} />
                <SectionRow>
                    <Field label={'Phase'} value={request.phase} />
                    <Field label={'Status'} value={request.state} />
                </SectionRow>
                <SectionRow>
                    <Field label={'Change category'} value={request.category} />
                    <Field label={'Change origin'} value={request.origin} />
                </SectionRow>
                <Field label={'Description'} value={request.description} />
            </DetailViewContainer>
            <ButtonContainer>
                {request.state === 'Draft' && (
                    <>
                        <Button onClick={setEditMode}>Edit</Button>
                        <HorizontalDivider />
                        <Button onClick={onInitiate} variant="outlined">
                            Initiate request
                        </Button>
                    </>
                )}
            </ButtonContainer>
        </div>
    );
};

const DetailViewContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const HorizontalDivider = styled.div`
    margin: 0.2em;
`;
