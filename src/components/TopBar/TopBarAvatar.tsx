import { Avatar, Icon, Popover } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useClientContext } from '@equinor/lighthouse-portal-client';
import { useRef, useState } from 'react';
import styled from 'styled-components';

export const TopBarAvatar = (): JSX.Element | null => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const {
        settings: { userImageUrl, user },
    } = useClientContext();

    if (!user) return null;

    return (
        <div>
            <div ref={ref} onClick={open}>
                {!userImageUrl ? (
                    <Icon
                        color={tokens.colors.interactive.primary__resting.hex}
                        name="account_circle"
                    />
                ) : (
                    <Avatar alt="User avatar" src={userImageUrl} />
                )}
            </div>
            <Popover anchorEl={ref.current} open={isOpen} onClose={close}>
                <Popover.Content>
                    <Wrapper>
                        <div>
                            <InfoText>Signed in as</InfoText>
                            <UserName>{user.displayName}</UserName>
                        </div>

                        <Meta>
                            <div>{user.jobTitle}</div>
                            <div>{user.userPrincipalName}</div>
                        </Meta>
                    </Wrapper>
                </Popover.Content>
            </Popover>
        </div>
    );
};

const InfoText = styled.div`
    font-size: 12px;
    font-weight: 500;
`;
const UserName = styled.div`
    font-size: 16px;
    font-weight: 500;
`;

const Meta = styled.div`
    font-size: 16px;
    font-weight: 400;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;
