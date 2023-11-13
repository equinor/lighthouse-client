import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import StatusItem from './StatusItem';
import { Background, StatusContent, Wrapper } from './StatusStyles';

export const Status = (): JSX.Element => {
    return (
        <Wrapper>
            <Typography variant="h5">Status</Typography>
            <StatusContent>
                <Background src="/images/boat.png" />
                <StatusItem
                    title="Deck"
                    statusColor={() => tokens.colors.interactive.success__resting.rgba}
                    live="2,3%"
                    actual="2,4%"
                    position={{ x: 150, y: 310 }}
                />
                <StatusItem
                    title="Topside"
                    statusColor={() => tokens.colors.interactive.warning__resting.rgba}
                    live="2,3%"
                    actual="2,4%"
                    position={{ x: 500, y: 250 }}
                />
                <StatusItem
                    title="Turret"
                    statusColor={() => tokens.colors.interactive.success__resting.rgba}
                    live="2,3%"
                    actual="2,4%"
                    position={{ x: 930, y: 210 }}
                />
                <StatusItem
                    title="LQ/Helideck"
                    statusColor={() => tokens.colors.interactive.success__resting.rgba}
                    live="2,3%"
                    actual="2,4%"
                    position={{ x: 1130, y: 250 }}
                />
                <StatusItem
                    title="Cargo tanks"
                    statusColor={() => tokens.colors.interactive.danger__resting.rgba}
                    live="2,3%"
                    actual="2,4%"
                    position={{ x: 450, y: 450 }}
                />
            </StatusContent>
        </Wrapper>
    );
};
