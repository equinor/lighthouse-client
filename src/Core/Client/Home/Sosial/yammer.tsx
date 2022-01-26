import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Header = styled.div`
    margin: 1rem;
`;
export const YammerFeed = (): JSX.Element => {
    return (
        <>
            <Header>
                <Typography variant="h5">Social</Typography>
            </Header>
            <iframe
                name="embed-feed"
                title="Yammer"
                src="https://web.yammer.com/embed/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIxMDA2NTk2NiJ9?header=false&footer=false&theme=light&background=white"
                style={{
                    border: '0px',
                    overflow: 'hidden',
                    width: '100%',
                    minHeight: '100%',
                }}
            ></iframe>
        </>
    );
};
