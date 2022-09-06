import { Button, Scrim } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { storage } from '@equinor/lighthouse-utils';
import { useEffect, useMemo, useState } from 'react';
import { linkForm } from '../Forms/link';
import { messageForm } from '../Forms/message';
import { Link, ServiceMessage } from '../Types/serviceMessage';
import { Container, ScrimContainer } from './ServiceMessagePostStyle';

window['postServiceMessage'] = (prop: string) => {
    storage.setItem('postMessage', prop);
};

export function ServiceMessagePost(): JSX.Element | null {
    const [isActive, setIsActive] = useState(false);
    const formDataMessage = useForm<ServiceMessage>(messageForm);
    const formDataLink = useForm<Link>(linkForm);
    const { appConfig } = useMemo(() => httpClient(), []);

    useEffect(() => {
        const shouldBeActive = storage.getItem<string>('postMessage');
        setIsActive(!!shouldBeActive);
    }, []);

    async function postMessage() {
        const message: ServiceMessage = { ...formDataMessage.data };

        if (formDataLink.data.title && formDataLink.data.url) {
            message.link = formDataLink.data;
        }

        await appConfig.post('api/serviceMessage', {
            body: JSON.stringify(message),
        });

        storage.setItem('postMessage', 'false');
        setIsActive(false);
    }

    const SubmitButton = () => {
        return (
            <Button
                disabled={!formDataMessage.isValidForm()}
                onClick={() => {
                    postMessage();
                }}
            >
                Submit
            </Button>
        );
    };
    const Cancel = () => {
        return (
            <Button
                onClick={() => {
                    storage.setItem('postMessage', 'false');
                    setIsActive(false);
                }}
            >
                Cancel
            </Button>
        );
    };

    const deleteServiceMessage = async () => {
        try {
            await appConfig.delete('api/serviceMessage');
        } catch (e) {
            console.error(e);
        } finally {
            // storage.setItem('postMessage', 'false');
            // setIsActive(false);
        }
    };

    return (
        <div>
            {isActive && (
                <Scrim
                    isDismissable={true}
                    onClose={() => {
                        setIsActive(false);
                    }}
                >
                    <ScrimContainer>
                        <Container>
                            <h2>Create Service Message</h2>
                            <GeneratedForm
                                formData={formDataMessage}
                                editMode={false}
                                buttons={[Cancel, SubmitButton]}
                            >
                                <h3>Link</h3>
                                <GeneratedForm
                                    formData={formDataLink}
                                    editMode={false}
                                    buttons={[]}
                                />
                            </GeneratedForm>
                        </Container>
                        <Container>
                            <h2>Delete active service message</h2>

                            <p>
                                This service message can be set to appear in the future (not shown
                                at the moment), so be sure that you actually want to delete it
                            </p>

                            <Button
                                color="danger"
                                variant="outlined"
                                onClick={() => deleteServiceMessage()}
                            >
                                Delete
                            </Button>
                        </Container>
                    </ScrimContainer>
                </Scrim>
            )}
        </div>
    );
}
