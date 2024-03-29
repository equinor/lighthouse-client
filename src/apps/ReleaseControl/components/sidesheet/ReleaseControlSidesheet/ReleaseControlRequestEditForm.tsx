import { useEffect } from 'react';
import { useReleaseControlContext, useUnpackReferences } from '../../../hooks';
import { ReleaseControlSidesheetBanner } from './ReleaseControlSidesheetBanner';
import { HeaderTab, SidesheetTabList, Tab, TabList } from './sidesheetStyles';
import { Tabs } from '@equinor/eds-core-react-old';
import { EditScopeTab } from './EditTabs/EditScopeTab';
import { EditWorkflowTab } from './EditTabs/EditWorkflowTab';
import { HistoryTab } from './Tabs/HistoryTab';
import { useEdsTabs } from '@equinor/hooks';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { TypedSelectOption } from '@equinor/Workflow';
import { RcScopeHtTag, RcScopeTag } from '../../../types/releaseControl';

export const ReleaseControlRequestEditForm = (): JSX.Element => {
  const releaseControl = useReleaseControlContext(({ releaseControl }) => releaseControl);
  const { activeTab, handleChange } = useEdsTabs();

  useEffect(() => {
    const { clearState, updateAtom } = DRCFormAtomApi;
    clearState();
    updateAtom({
      ...releaseControl,
      documentNumbers: releaseControl?.documents?.map((document) => document.id),
      punchListItemIds: releaseControl?.punchListItems?.map((punchListItem) => punchListItem.id),
      scopeChangeRequestReferences: releaseControl?.scopeChangeRequestReferences,
      scopeHTTags: releaseControl.scopeHTTags
        ? releaseControl?.scopeHTTags.map((s) => s.tagNo)
        : [],
      scopeTags: releaseControl.scopeTags ? releaseControl?.scopeTags.map((s) => s.tagNo) : [],
      tags: releaseControl?.scopeTags?.map(
        (famTag: RcScopeTag): TypedSelectOption => ({
          label: `${famTag.tagNo}`,
          value: famTag.tagNo,
          type: 'famtag',
          searchValue: famTag.tagNo,
          object: famTag,
        })
      ),
      htCables: releaseControl?.scopeHTTags?.map(
        (famTag: RcScopeHtTag): TypedSelectOption => ({
          label: `${famTag.tagNo}`,
          value: famTag.tagNo,
          type: 'htcable',
          searchValue: famTag.tagNo,
          object: famTag,
        })
      ),
    });
    return () => {
      clearState();
    };
  }, []);

  useUnpackReferences({ releaseControl });

  return (
    <>
      <ReleaseControlSidesheetBanner />
      <Tabs activeTab={activeTab} onChange={handleChange}>
        <SidesheetTabList>
          <HeaderTab>Scope</HeaderTab>
          <HeaderTab>Workflow</HeaderTab>
          <HeaderTab>History</HeaderTab>
        </SidesheetTabList>
        <TabList>
          <Tab>
            <EditScopeTab />
          </Tab>
          <Tab>
            <EditWorkflowTab />
          </Tab>
          <Tab>
            <HistoryTab />
          </Tab>
        </TabList>
      </Tabs>
    </>
  );
};
