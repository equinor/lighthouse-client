import { Icon } from '@equinor/lighthouse-components';
import { WidgetManifest } from '@equinor/lighthouse-widgets';
import { useEffect } from 'react';
import styled from 'styled-components';
import { SidesheetApi } from '../Types/SidesheetApi';


interface NoAccessProps {
    item: WidgetManifest;
    actions: SidesheetApi;
}
export function NoAccess({ item, actions }: NoAccessProps): JSX.Element {
    useEffect(() => {
        actions.setTitle(item.title);
        return () => {
            actions.setTitle('');
        };
    }, []);

    return (
        <Wrapper>
            <Icon name="info_circle" size={48} color={item.color} />
            <Heading>Failed to load {item.title}.</Heading>
            <Paragraph>User has no access to this, pleas contract support for access.</Paragraph>
        </Wrapper>
    );
}

const Heading = styled.h1`
    text-align: center;
    padding: 1rem;
    margin-bottom: 0;
    padding-bottom: 0;
`;
const Paragraph = styled.p`
    text-align: center;
    padding: 1rem;
    margin: 0;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;
