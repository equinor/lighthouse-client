import { Progress } from '@equinor/eds-core-react';
import { Fullscreen } from './client.styles';

export const ClientLoading = (): JSX.Element => {
    return (
        <Fullscreen>
            <Progress.Star height={200} width={200} />
        </Fullscreen>
    );
};
