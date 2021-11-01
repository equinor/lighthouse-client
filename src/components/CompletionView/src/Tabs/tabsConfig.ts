import React from 'react';
import { AnalyticsIcon } from '../../../../icons/Analytics';
import { BoardsIcon } from '../../../../icons/Board';
import { GantIcon } from '../../../../icons/Gant';
import { ListIcon } from '../../../../icons/List';
import { TreeIcon } from '../../../../icons/Tree';
import { AnalyticsTab } from './AnalyticsTab';
import { GardenTab } from './GardenTab';
import { ListTab } from './ListTab';
import { PowerBiTab } from './PowerBiTab';
import { TimelineTab } from './TimeLineTAb';
import { TreeTab } from './TreeTab';

interface TabsConfigItem {
    title: string;
    icon: React.FC;
    viewComponent: React.FC;
}

const tabsConfig: TabsConfigItem[] = [
    {
        title: 'Tree',
        icon: TreeIcon,
        viewComponent: TreeTab
    },
    {
        title: 'List',
        icon: ListIcon,
        viewComponent: ListTab
    },
    {
        title: 'Garden',
        icon: BoardsIcon,
        viewComponent: GardenTab
    },
    {
        title: 'Timeline',
        icon: GantIcon,
        viewComponent: TimelineTab
    },
    {
        title: 'Analytics',
        icon: AnalyticsIcon,
        viewComponent: AnalyticsTab
    },
    {
        title: 'PowerBI',
        icon: AnalyticsIcon,
        viewComponent: PowerBiTab
    }
];

interface ActiveTabs {
    tabs: TabsConfigItem[];
    viewIsActive: boolean;
}

function getTabConfig(tabsConfig: TabsConfigItem[]) {
    return function useConfiguredTabs<Config extends Object>(
        tree?: Config,
        list?: Config,
        garden?: Config,
        timeline?: Config,
        analytics?: Config,
        powerBI?: Config
    ): ActiveTabs {
        const tabs = tabsConfig.filter((item) => {
            if (tree && item.title === 'Tree') return true;
            if (list && item.title === 'List') return true;
            if (garden && item.title === 'Garden') return true;
            if (timeline && item.title === 'Timeline') return true;
            if (analytics && item.title === 'Analytics') return true;
            if (powerBI && item.title === 'PowerBI') return true;
            return false;
        });
        return {
            tabs,
            viewIsActive: tabs.length > 0
        };
    };
}

export const useConfiguredTabs = getTabConfig(tabsConfig);
