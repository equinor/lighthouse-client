import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Upload = (): JSX.Element => {
    return (
        <AttachmentsContainer>
            <DropHere>
                <Icon
                    style={{ width: '32px', height: '32px' }}
                    name={'cloud_upload'}
                    color={tokens.colors.interactive.primary__resting.rgba}
                />
                <span style={{ fontSize: '16px' }}>Drop files or browse to upload</span>
            </DropHere>
        </AttachmentsContainer>
    );
};

const AttachmentsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96px;
    width: 592px;
    border: 2px dotted ${tokens.colors.interactive.primary__resting.hex};
`;

const DropHere = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
