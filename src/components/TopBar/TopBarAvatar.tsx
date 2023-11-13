import { Avatar, Icon, Popover } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useAuthProvider, useClientContext } from '@equinor/lighthouse-portal-client';
import { useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { Availability, getUserPresence } from '../../Core/Client/Functions/getUserPresence';

const PresenceQueryKey = ['Presence'];

export const TopBarAvatar = (): JSX.Element | null => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const open = () => {
        setIsOpen(true);
        queryClient.invalidateQueries(PresenceQueryKey);
    };
    const close = () => setIsOpen(false);
    const {
        settings: { userImageUrl, user },
    } = useClientContext();

    const { getCurrentUser } = useAuthProvider();

    const { data: presence } = useQuery(
        PresenceQueryKey,
        async () => await getUserPresence(getCurrentUser()?.localAccountId.split('.')[0] ?? ''),
        {
            refetchInterval: isOpen ? 1000 * 60 : 5000 * 60,
        }
    );

    const presenceInfo = getPresenceInfo(presence?.availability);

    if (!user) return null;

    return (
        <div>
            <div style={{ position: 'relative' }} ref={ref} onClick={open}>
                {!userImageUrl ? (
                    <Icon
                        color={tokens.colors.interactive.primary__resting.hex}
                        name="account_circle"
                    />
                ) : (
                    <Avatar alt="User avatar" src={userImageUrl} />
                )}
                <StatusIconOverAvatar>{presenceInfo.icon}</StatusIconOverAvatar>
            </div>
            <Popover anchorEl={ref.current} open={isOpen} onClose={close}>
                <Popover.Content>
                    <Wrapper>
                        <div>
                            <InfoText>Signed in as</InfoText>
                            <UserName>{user.displayName}</UserName>
                            <Presence>
                                <div>{presenceInfo.icon} </div>
                                <div>{presenceInfo.status}</div>
                            </Presence>
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

const StatusIconOverAvatar = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
`;

interface PresenceInfo {
    status: string;
    icon: JSX.Element;
}

function getPresenceInfo(status: Availability | undefined): PresenceInfo {
    if (!status) return { icon: <Icon name="help" />, status: 'Unknown' };

    switch (status) {
        case 'Available':
            return {
                icon: <StatusCircle color="#4bb748" />,
                status: 'Available',
            };

        case 'Away':
            return {
                icon: <StatusCircle color="#fbca36" />,
                status: 'Away',
            };

        case 'BeRightBack':
            return {
                icon: <StatusCircle color="#fbca36" />,
                status: 'Be right back',
            };

        case 'Busy':
            return {
                icon: <StatusCircle color="#eb0000" />,
                status: 'Busy',
            };

        case 'DoNotDisturb': {
            return {
                icon: <StatusCircle color="#eb0000" />,
                status: 'Do not disturb',
            };
        }

        case 'Offline':
            return {
                icon: <StatusCircle color="#bfbfbf" />,
                status: 'Offline',
            };

        default: {
            return {
                icon: <StatusCircle color="grey" />,
                status: 'Unknown',
            };
        }
    }
}

const Presence = styled.div`
    display: flex;
    align-items: center;
    gap: 0.35em;
`;

const StatusCircle = styled.div<{ color: string }>`
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
`;

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
