import { CustomClientApi } from '@equinor/portal-client';
import styled from 'styled-components';
import { ModelViewer } from '../../../packages/ModelViewer/ModelViewer';

export const Wrapper = styled.div`
    height: calc(100vh - 48px);
`;

export const PortalModelViewer: React.FC<CustomClientApi> = (): JSX.Element => {
    return (
        <Wrapper>
            <ModelViewer
                tags={[
                    // '82EL068-417',
                    // '82EL068-417-B01',
                    '56L00420A',
                    '56L00420B',
                    '56L00440A',
                    '56L00446A',
                ]}
                padding={0}
            />
        </Wrapper>
    );
};
