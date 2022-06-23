import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useLocationContext } from '../../../Context/LocationProvider';
import { useViewerContext } from '../../../Context/ViewProvider';
import { TabsConfigItem } from '../../../Util/tabsConfig';
import { TabButton } from '../../ToggleButton';
import { ANALYTICS } from '../Header';
import { Divider } from '../HeaderStyles';

interface HeaderTabButtonsProps {
    tabs: TabsConfigItem[];
}

export const HeaderTabButtons = ({ tabs }: HeaderTabButtonsProps): JSX.Element => {
    const { hasPowerBi } = useViewerContext();
    const { handleSetActiveTab, activeTab } = useLocationContext();

    return (
        <>
            {hasPowerBi && (
                <>
                    <TabButton
                        onClick={() => handleSetActiveTab(ANALYTICS)}
                        aria-selected={activeTab === ANALYTICS}
                        title={'Power Bi analytics'}
                        color={
                            activeTab === ANALYTICS
                                ? tokens.colors.interactive.primary__resting.hex
                                : undefined
                        }
                    >
                        <Icon name={'bar_chart'} />
                    </TabButton>
                    <Divider />
                </>
            )}
            {tabs.map((tab) => {
                if (tab.tabId === ANALYTICS) return;
                const Icon = tab.icon;

                const isActiveTab = activeTab === tab.tabId;

                return (
                    <TabButton
                        onClick={() => handleSetActiveTab(tab.tabId)}
                        key={`tab-${tab.icon}`}
                        aria-selected={isActiveTab}
                        title={tab.title}
                        color={
                            isActiveTab ? tokens.colors.interactive.primary__resting.hex : undefined
                        }
                    >
                        <Icon />
                    </TabButton>
                );
            })}
            <Divider />
        </>
    );
};
