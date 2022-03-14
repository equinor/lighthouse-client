import { Button, Scrim } from '@equinor/eds-core-react';
import { GeneratedForm, Schema, useForm } from '@equinor/Form';
import { httpClient } from '@equinor/portal-client';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { usePostServiceMessage } from '../Hooks/usePostServiceMessage';
import { Link, ServiceMessage } from '../Types/serviceMessage';
import { storage } from '../utils/storage';

window['postServiceMessage'] = (prop: string) => {
    storage.setItem('postMessage', prop);
};

export const messageForm: Schema<Omit<ServiceMessage, 'id'>> = {
    message: {
        title: 'Message',
        inputType: { type: 'TextArea' },
        order: 1,
        placeholderText: 'Please add Message',
    },
    type: {
        title: 'Chose Type',
        inputType: {
            type: 'SingleSelect',
            selectOptions: ['info', 'warning', 'default'],
        },
        order: 3,
        placeholderText: 'Select Type',
    },
    fromDate: {
        title: 'From Date',
        inputType: { type: 'Date' },
        order: 4,
        // placeholderText: 'Use this format 00/00/0000',
    },
    toDate: {
        title: 'To Date',
        inputType: { type: 'Date' },
        order: 4,
        // placeholderText: 'Use this format 00/00/0000',
    },

};

export const linkForm: Schema<Link> = {
    title: {
        title: 'Link Title',
        inputType: { type: 'TextInput' },
        order: 1,
        optional: true,
        placeholderText: 'Please add Link Title',

    },
    url: {
        title: 'Url',
        inputType: {
            type: 'TextInput',
        },
        order: 1,
        optional: true,
        placeholderText: 'Please add Link Url',
    },
};



export function ServiceMessagePost(): JSX.Element | null {
    const [isActive, setIsActive] = useState(false);
    const formDataMessage = useForm<ServiceMessage>(messageForm);
    const formDataLink = useForm<Link>(linkForm);
    const { appConfig } = useMemo(() => httpClient(), []);
    const post = usePostServiceMessage();

    useEffect(() => {
        const shouldBeActive = storage.getItem<string>('postMessage');
        setIsActive(!!shouldBeActive);
    }, []);



    async function postMessage(message?: ServiceMessage) {
        const response = await appConfig.post('/api/serviceMessage', {
            body: JSON.stringify(message),
        });
        console.log(response);
    }


    const SubmitButton = () => {
        return <Button onClick={() => {
            console.log(formDataMessage.data)
            postMessage(formDataMessage.data)
        }}>Submit</Button>;
    };


    return (
        <div>
            {isActive && (
                <Scrim
                    isDismissable={true}
                    onClose={() => {
                        storage.setItem('postMessage', 'false');
                        setIsActive(false);
                    }}
                >
                    <ScrimContainer>
                        <Container>
                            <h2>Create Service Message</h2>
                            <GeneratedForm
                                formData={formDataMessage}
                                editMode={false}
                                buttons={[SubmitButton]}
                            >
                                <h3>Link</h3>
                                <GeneratedForm
                                    formData={formDataLink}
                                    editMode={false}
                                    buttons={[]}
                                />
                            </GeneratedForm>
                        </Container>
                    </ScrimContainer>
                </Scrim>
            )
            }
        </div >
    );
}

const ScrimContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: -webkit-fill-available;
    background: white;
    max-width: 90vh;
    overflow: scroll;
`;

const Container = styled.div`
    min-width: 60vh;
    align-content: stretch;
    align-items: center;
    justify-content: center;
    padding: 2em;
`;
