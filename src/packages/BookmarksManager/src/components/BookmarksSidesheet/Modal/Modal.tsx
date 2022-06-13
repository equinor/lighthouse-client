import { Dialog, Scrim } from '@equinor/eds-core-react';
import styled from 'styled-components';
const DialogContainer = styled(Dialog)`
    width: 100%;
    padding: 0.8rem 0.8rem;
    min-width: 350px;
`;
const DialogPadding = styled.div`
    padding-left: 1em;
    padding-right: 1em;
`;

const TitleSection = styled.h2`
    width: 100%;
`;
type ModalProps = {
    title: string;
    content: React.ReactNode;
};
export const Modal = ({ title, content }: ModalProps) => {
    return (
        <Scrim isDismissable={false} style={{ zIndex: 1000 }}>
            <DialogContainer>
                <DialogPadding>
                    <TitleSection>{title}</TitleSection>
                    {content}
                </DialogPadding>
            </DialogContainer>
        </Scrim>
    );
};
