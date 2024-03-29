import React from 'react';
import { Analytics } from '../Icons/Analytics';
import { Garden } from '../Icons/Garden';
import { HelpPageIcon } from '../Icons/Help';
import { AdminIcon } from '../Icons/Admin';
import { Table } from '../Icons/Table';
import { Tree } from '../Icons/Tree';
import { GardenTab } from '../Tabs/GardenTab';
import { HelpPageTab } from '../Tabs/HelpPageTab';
import { ListTab as TableTab } from '../Tabs/ListTab/ListTab';
import { ListTabPopover } from '../Tabs/ListTab/ListTabPopover';
import { PowerBiTab } from '../Tabs/PowerBiTab';
import { TreeTab } from '../Tabs/TreeTab';
import { WorkSpaceConfig, WorkspaceTab } from '../WorkSpaceApi/workspaceState';
import { AdminTab } from '../Tabs/AdminTab';

export interface TabsConfigItem {
  title: string;
  tabId: WorkspaceTab;
  icon: React.FC;
  viewComponent: React.FC;
  viewSettings?: React.FC;
}

const tabsConfig: TabsConfigItem[] = [
  {
    title: 'Tree',
    tabId: 'tree',
    icon: Tree,
    viewComponent: TreeTab,
  },
  {
    title: 'Table',
    tabId: 'table',
    icon: Table,
    viewComponent: TableTab,
    viewSettings: ListTabPopover,
  },
  {
    title: 'Garden',
    tabId: 'garden',
    icon: Garden,
    viewComponent: GardenTab,
  },
  {
    title: 'PowerBI',
    tabId: 'analytics',
    icon: Analytics,
    viewComponent: PowerBiTab,
  },
  {
    title: 'Help',
    tabId: 'help',
    icon: HelpPageIcon,
    viewComponent: HelpPageTab,
  },
  {
    title: 'Admin',
    tabId: 'admin',
    icon: AdminIcon,
    viewComponent: AdminTab,
  },
];

interface ActiveTabs {
  tabs: TabsConfigItem[];
  viewIsActive: boolean;
}

function getTabConfig(tabsConfig: TabsConfigItem[]) {
  return function useConfiguredTabs({
    treeOptions,
    tableOptions,
    gardenOptions,
    powerBiOptions,
    helpPageOptions,
    adminOptions,
  }: WorkSpaceConfig<Record<PropertyKey, unknown>>): ActiveTabs {
    const tabs = tabsConfig.filter((item) => {
      if (treeOptions && item.title === 'Tree') return true;
      if (tableOptions && item.title === 'Table') return true;
      if (gardenOptions && item.title === 'Garden') return true;
      if (powerBiOptions && item.title === 'PowerBI') return true;
      if (helpPageOptions && item.title === 'Help') return true;
      if (adminOptions && item.title === 'Admin') return true;
    });
    return {
      tabs,
      viewIsActive: tabs.length > 0,
    };
  };
}

export const useConfiguredTabs = getTabConfig(tabsConfig);
