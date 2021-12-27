import React from 'react';
import { Button, Scrim } from '@equinor/eds-core-react';
import { Icon } from '@equinor/eds-core-react';

import styled from 'styled-components';
import { useScrim } from './Hooks/useScrim';
import { clearActiveScrim } from './Functions/clearActiveScrim';

export const PopupScrim = (): JSX.Element => {
    const { Component } = useScrim();
    const ScrimContent = Component;

    return (
        <>
            {ScrimContent && (
                <Scrim isDismissable={true} onClose={clearActiveScrim}>
                    <ScrimContainer>
                        <ButtonRow>
                            <Button variant="ghost_icon" onClick={clearActiveScrim}>
                                <Icon name="close" />
                            </Button>
                        </ButtonRow>
                        <Container>
                            <ScrimContent />
                        </Container>
                    </ScrimContainer>
                </Scrim>
            )}
        </>
    );
};

const ScrimContainer = styled.div`
    position: fixed;
    top: 0;
    background: #ffffff;
    right: 0;
    height: 100%;
    max-width: 90vh;
    padding: 15px;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
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
