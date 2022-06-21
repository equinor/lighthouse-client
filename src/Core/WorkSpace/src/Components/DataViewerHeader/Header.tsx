import { PerformanceObserver } from '../../../../PerformanceObserver/PerformanceObserver';
import { useLocationContext } from '../../Context/LocationProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { ActionBar, HeaderWrapper, Title, TitleBar } from './HeaderStyles';
import { PowerBiHeader } from './PowerBiHeader';
import { WorkspaceHeader } from './WorkspaceHeader';

interface CompletionViewHeaderProps {
    shortName: string;
    groupe: string;
    tabs: TabsConfigItem[];
    title: string;
    sideSheetWidth: number;
}

export const ANALYTICS = 'analytics';

export const CompletionViewHeader = ({
    shortName,
    tabs,
    groupe,
    title,
    sideSheetWidth,
}: CompletionViewHeaderProps): JSX.Element => {
    const { activeTab } = useLocationContext();
    return (
        <HeaderWrapper sideSheetWidth={sideSheetWidth}>
            <TitleBar>
                <Title variant="h3">{title}</Title>
                <PerformanceObserver />
            </TitleBar>
            <ActionBar>
                {activeTab === ANALYTICS ? (
                    <PowerBiHeader tabs={tabs} group={groupe} shortName={shortName} />
                ) : (
                    <WorkspaceHeader tabs={tabs} group={groupe} shortName={shortName} />
                )}
            </ActionBar>
        </HeaderWrapper>
    );
};
