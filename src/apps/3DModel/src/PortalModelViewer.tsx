import { CustomClientApi } from '@equinor/lighthouse-portal-client';
import styled from 'styled-components';
import { ModelViewer } from '../../../packages/ModelViewer/ModelViewer';

export const Wrapper = styled.div`
    height: calc(100vh - 48px);
`;

export const PortalModelViewer: React.FC<CustomClientApi> = (): JSX.Element => {
    return (
        <Wrapper>
            <ModelViewer loadFullModel={true} />
        </Wrapper>
    );
};
