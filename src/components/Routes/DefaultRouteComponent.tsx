import { tokens } from '@equinor/eds-tokens';
import { AppManifest } from '@equinor/lighthouse-portal-client';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

const Wrapper = styled.div`
    height: '-webkit-fill-available';
    height: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
`;
const Heading = styled.h1`
    color: ${tokens.colors.text.static_icons__tertiary.rgba};
    margin-bottom: 0;
`;

const Info = styled.p`
    color: ${tokens.colors.interactive.secondary__resting.rgba};
    font-weight: 500;
`;

export const DefaultRouteComponent = (route: AppManifest) => {
    const CustomIcon = route.icon && typeof route.icon !== 'string' ? route.icon : undefined;
    return (
        <Wrapper>
            {route.icon && typeof route.icon === 'string' ? (
                <Icon
                    name={route.icon}
                    color={tokens.colors.interactive.warning__resting.rgba}
                    size={48}
                />
            ) : (
                CustomIcon && <CustomIcon />
            )}
            <Heading>This is a default app component for {route.title}</Heading>

            <Info>The component is part of the {route.groupe} group</Info>
            {route.tags.length > 0 && <Info> Component tags are : {route.tags.join('-')}</Info>}
        </Wrapper>
    );
};
