import { Button, Scrim } from '@equinor/eds-core-react';
import { GeneratedForm, Schema, useForm } from '@equinor/Form';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePostServiceMessage } from '../Hooks/usePostServiceMessage';
import { ServiceMessage } from '../Types/serviceMessage';
import { storage } from '../utils/storage';

// window['postServiceMessage'] = (prop: string) => {
//     storage.setItem('postMessage', prop);
// };

export const form: Schema<Omit<ServiceMessage, 'id'>> = {
    message: {
        title: 'Message',
        inputType: { type: 'TextInput' },
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
        title: 'Scope description',
        inputType: { type: 'TextArea' },
        order: 4,
        placeholderText: 'Please add description',
    },
    toDate: {
        title: 'Scope description',
        inputType: { type: 'TextArea' },
        order: 4,
        placeholderText: 'Please add description',
    },
};

export function ServiceMessagePost(): JSX.Element | null {
    const [isActive, setIsActive] = useState(false);
    const formData = useForm<ServiceMessage>(form);
    const post = usePostServiceMessage();

    useEffect(() => {
        const shouldBeActive = storage.getItem<string>('postMessage');
        setIsActive(!!shouldBeActive);
    }, []);

    const SubmitButton = () => {
        return <Button onClick={() => post.postMessage(formData.data)}>Submit</Button>;
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
                        <GeneratedForm
                            formData={formData}
                            editMode={false}
                            buttons={[SubmitButton]}
                        ></GeneratedForm>
                    </ScrimContainer>
                </Scrim>
            )}
        </div>
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
