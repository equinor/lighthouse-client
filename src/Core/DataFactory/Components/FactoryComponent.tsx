import { useState } from 'react';
import { Scrim } from '@equinor/eds-core-react';

import { useFactories } from '../Hooks/useFactories';
import { clearActiveFactory } from '../Functions/clearActiveFactory';
import styled from 'styled-components';
import { spawnConfirmationDialog } from '../../ConfirmationDialog/Functions/spawnConfirmationDialog';

interface FactoryComponentProps {
    onClose?: () => void;
}

export function FactoryComponent({ onClose }: FactoryComponentProps): JSX.Element {
    const { activeFactory, scope } = useFactories();
    const Component = activeFactory?.component;
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const closeScrim = () => {
        if (hasUnsavedChanges) {
            spawnConfirmationDialog('Your changes will be lost', 'Unsaved changes', () => close());
        } else {
            close();
        }
    };

    const close = () => {
        onClose && onClose();
        clearActiveFactory();
        setHasUnsavedChanges(false);
    };
    //Todo refactor confirmation scrim out to a global event scrim
    return (
        <>
            {Component && (
                <Scrim
                    onClose={() => {
                        closeScrim();
                    }}
                    isDismissable={true}
                >
                    <ScrimContainer>
                        <Container>
                            <Component
                                {...scope}
                                closeScrim={closeScrim}
                                setHasUnsavedChanges={(value: boolean) =>
                                    setHasUnsavedChanges(value)
                                }
                            />
                        </Container>
                    </ScrimContainer>
                </Scrim>
            )}
        </>
    );
}

const ScrimContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    max-width: 90vh;
`;

const Container = styled.div`
    min-width: 60vh;
    background: #ffffff;
    overflow: hidden;
    align-content: stretch;
    align-items: center;
    justify-content: center;
    padding: 2em;
    height: 100%;
    overflow: hidden;
`;
