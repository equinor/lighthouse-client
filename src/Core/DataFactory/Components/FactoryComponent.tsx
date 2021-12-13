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

    return (
        <>
            {Component && (
                <Scrim
                    onClose={() => {
                        setShowDialog(true);
                        onClose && onClose();
                    }}
                    isDismissable={true}
                >
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
                        <Component {...scope} />
                    </Container>
                </Scrim>
            )}
        </>
    );
}

const Container = styled.div`
    height: 40vh;
    width: 90vh;
    background: #ffffff;
    display: flex;
    align-content: stretch;
    align-items: center;
    justify-content: center;
`;
