import { Banner, Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Fallback = (): JSX.Element => {
    return (
        <Wrapper>
            <Banner>
                <Banner.Icon variant="warning">
                    <Icon name="thumbs_down" />
                </Banner.Icon>
                <Banner.Message>Sorry, we could not find what you are looking for</Banner.Message>
            </Banner>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
