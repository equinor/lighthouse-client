import { Typography } from '@equinor/eds-core-react';
import { useSettings } from '../Hooks/useClientContext';
import { PowerBIHome } from './PbiHome/PbiHome';
import { Container, Content, Header, ViewportWrapper } from './clientHomeStyles';

export const ClientHome = (): JSX.Element => {
    const { user } = useSettings();
    return (
        <>
            <Content>
                <Header>
                    <Typography variant="h3">Welcome {user?.displayName}</Typography>
                </Header>
                <ViewportWrapper>
                    <Container>
                        <PowerBIHome reportUri={'jca-landing-page '} />

                        {/* <KpiBar>
                        <KpiGroup
                            title="Safety indicators"
                            linkText="Open SSU dashboard"
                            link="/SSU/safety-performance"
                            kpiItems={[
                                {
                                    type: 'ProgressItem',
                                    value: '0.15',
                                    description: 'SIF last 12 months',
                                    progress: 30,
                                    progressColor: () => ({
                                        progress: tokens.colors.interactive.success__resting.rgba,
                                        progressBg:
                                            tokens.colors.interactive.success__highlight.rgba,
                                    }),
                                },
                                {
                                    type: 'ProgressItem',
                                    value: '0.60',
                                    description: 'TRIF last 12 months',
                                    progress: 50,
                                    progressColor: () => ({
                                        progress: tokens.colors.interactive.success__resting.rgba,
                                        progressBg:
                                            tokens.colors.interactive.success__highlight.rgba,
                                    }),
                                },
                                {
                                    type: 'ProgressItem',
                                    value: '0.22',
                                    description: 'FOF last 12 months',
                                    progress: 70,
                                    progressColor: () => ({
                                        progress: tokens.colors.interactive.warning__resting.rgba,
                                        progressBg:
                                            tokens.colors.interactive.warning__highlight.rgba,
                                    }),
                                },
                            ]}
                        />
                        <KpiGroup
                            title="Milestones"
                            linkText="Open Milestone dashboard"
                            link="/ProjectInformation/milestone"
                            kpiItems={[
                                {
                                    type: 'StatusItem',
                                    value: 'MIL018',
                                    description: 'Winterization',
                                    statusText: 'Actual 01.01.2023',
                                    status: () => tokens.colors.interactive.success__resting.rgba,
                                },
                                {
                                    type: 'StatusItem',
                                    value: 'MIL020',
                                    description: 'Ready for production',
                                    statusText: 'Planned 15.06.2023',
                                    status: () => '',
                                },
                                {
                                    type: 'StatusItem',
                                    value: 'MIL022',
                                    description: 'Offshore demob',
                                    statusText: 'Planned 15.09.2023',
                                    status: () => '',
                                },
                            ]}
                        />
                    </KpiBar>
                    <Status /> */}
                    </Container>
                </ViewportWrapper>
            </Content>
        </>
    );
};
