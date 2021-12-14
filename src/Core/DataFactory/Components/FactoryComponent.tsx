import { useState } from 'react';
import { Scrim } from '@equinor/eds-core-react';

import { useFactories } from '../Hooks/useFactories';
import { clearActiveFactory } from '../Functions/clearActiveFactory';
import styled from 'styled-components';
import { ConfirmationDialog } from './ConfirmationDialog';

interface FactoryComponentProps {
    onClose?: () => void;
}

export function FactoryComponent({ onClose }: FactoryComponentProps): JSX.Element {
    const { activeFactory, scope } = useFactories();
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const Component = activeFactory?.component;

    const closeScrim = () => {
        setShowDialog(true);
        onClose && onClose();
    };

    return (
        <>
            {Component && (
                <Scrim
                    //style={{ height: '100%', top: 0, right: 0, position: 'fixed' }}
                    onClose={() => {
                        setShowDialog(true);
                        onClose && onClose();
                    }}
                    isDismissable={true}
                >
                    <ScrimContainer>
                        <Container>
                            {showDialog && (
                                <Scrim isDismissable={false}>
                                    <ConfirmationDialog
                                        dialogTitle={'Unsaved changes'}
                                        dialogText={
                                            'By clicking Ok, you will cancel creation and lose the information filled in.'
                                        }
                                        onConfirm={() => {
                                            clearActiveFactory();
                                            setShowDialog(false);
                                        }}
                                        onReject={() => {
                                            setShowDialog(false);
                                        }}
                                    />
                                </Scrim>
                            )}
                            <Component {...scope} closeScrim={closeScrim} />
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
