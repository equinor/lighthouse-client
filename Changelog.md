# Changelog Castberg Project Portal

All notable changes to this project will be documented in this file.

The changelog is valid starting with Castberg Project Portal v0.1.0-alpha.

# 2.24.0

-   [ReleaseControl] Change order of filters, and column headers in the table view.

# 2.23.0

-   [ReleaseControl] Add "Mc Pkg Owner" and "Tag MC" columns to scopetag table in sidesheet, and reorginize the columns

# 2.22.0

-   [ReleaseControl] Add Tags and Heattrace tags to table view. Also added to filters.

# 2.21.0

-   [ReleaseControl] Fix bug where scopetags was not showing in edit mode in sidesheet

# 2.20.4

-   [ReleaseControl] Updated FAM queries that uses preprocessed views (custom_punch and custom_loopsidesheetchecklists)

# 2.20.3

-   [ReleaseControl] Make it so workflow tab has a max width of 600px.

# 2.20.2

-   [ReleaseControl] Fix copy url for Job Analytics

## 2.20.1

-   [ReleaseControl] Text under "Scope" in the sidesheet should now fill the entire whitespace.

## 2.20.0

-   [ReleaseControl] You can now edit the content of the current workflow step.

## 2.19.4

-   [Job analytics] Fix broken bookmark redirect

## 2.19.3

-   [ReleaseControl] Fix API request to wrong endpoint when working with workflows in admin panel

## 2.19.2

-   [ReleaseControl] Re-enable the ability to re-/assign people to the "initiate" workflow step.

## 2.19.1

-   [Portal] Add Job analytics

## 2.19.0

-   [ReleaseControl] Move Echo 3D button to links header.
-   [ReleaseControl] Fix bug where Mounted on displayed null.

## 2.18.2

-   [ReleaseControl] Show functional role in parentheses when criteria is signed.

## 2.18.1

-   [ReleaseControl] Fix querying removed workflowsteps

## 2.18.0

-   [ReleaseControl] Added link to Echo 3D from sidesheet.
-   [ReleaseControl] Add new information to the description box (while creating a RC).

## 2.17.1

-   [ReleaseControl] Fixed bug related to areas not showing before after submitting RC.

## 2.17.0

-   [ReleaseControl] Added new filter column for "Contains Step" to RC filters.

## 2.16.0

-   [ReleaseControl] Fixed issue with unnececary commas when displaying tags in RC.

## 2.15.0

-   [ReleaseControl] Add new information to the description box (while creating a RC).

## 2.14.0

-   [ReleaseControl] Sidesheet opened from notification centre/tasks centre now opens the app itself.
-   [ScopeChangeRequest] Sidesheet opened from notification centre/tasks centre now opens the app itself.

## 2.13.0

-   [ReleaseControl] Disabled the assigne textbox again. Hopefully without any side effects this time.

## 2.12.0

-   [ReleaseControl] Fixed sidesheet not opening when clicking on a Release Control notification/task.
-   [ReleaseControl] Re-enabled the assigne textbox. Unwanted side-effect that we were unable to assign someone while creating a new Release Control.

## 2.11.0

-   [ReleaseControl] Disabled the ability to re-assign a workflow during Edit Mode.

## 2.10.0

-   [ReleaseControl] Add a default description in DescriptionInput in ReleaseControlProcessForm

## 2.9.1

-   [ReleaseControl] Fix bug related to last change. Add a hardcoded variable

## 2.9.0

-   [ReleaseControl] Change step-selection in create RC sidesheet from hardcoded to the selection from workflow steps

## 2.8.0

-   [ReleaseControl] Add clickable links to procosys on HT, AB/-Test and Switchboard in circuit diagram

## 2.7.1

-   [Handover] Fix creating bookmark reloading application

## 2.7.0

-   [ReleaseControl] Add "?" icon on estimated HT cable length
-   [ReleaseControl] Changed the colour on the icon displayed when a cable is installed.
-   [ReleaseControl] Add "X" icon when there is no installed HT cable
-   [ReleaseControl] Add "Area" header to Tag table

## 2.6.0

-   [ReleaseControl] Add icons to Heat Trace cable length in sidesheet
-   [ReleaseControl] Fix bug where all workflows were reversed(Added in 2.4.0)

## 2.5.1

-   [Bookmarks] Fix bookmark bugs

## 2.5.0

-   [ReleaseControl] Add more options to "Time on step" filter

## 2.4.0

-   [ReleaseControl] Add "Time on step" column in table and add "Time on step" filter

## 2.3.0

-   [ReleaseControl] Add Area column to HeatTrace Cable Table

## 2.2.0

-   [ReleaseControl] Add Next to Sign filter

## 2.1.1

-   [Portal] feat: Contact person now visible under help icon in topbar

## 2.1.0

-   [ScopeChangeRequest] Feat: Change default selection in State in filters

## 2.0.0

-   [Portal] New fusion app Handover
-   [Handover] deprecation notice added with button to load new Fusion app Handover

## 1.37.4

-   [Portal] Fix: when clicking a task it now opens a new tab with the corresponding scr sidesheet

## 1.37.3

-   [ScopeChangeRequest] Fix sidesheet header overflow:hidden

## 1.37.2

-   [PowerBi] Fix filters breaking in production

## 1.37.1

-   [PowerBi] All filters visible by default in expanded filter powerbi

## 1.37.0

-   [Punch] Add Form Type and Discipline as column and filter

## 1.36.0

-   [SCR] Add phase as column and filter

## 1.35.2

-   [Workorder] Fix sidesheetheader to ellipsis and make procosys button always visible

## 1.35.1

-   [Portal] Fixed so better responsive landing page

## 1.35.0

-   [Portal] Removed Tasks and Yammer widget from landing page

## 1.34.1

-   [Workorder] add priority1-3 in testdata and fix some small type bugs

## 1.34.0

-   [Workorder] Add a Comm Priority1 filter and change sidesheet header

## 1.33.0

-   [ReleaseControl] Workflow admin access checked

## 1.32.2

-   [Workorder] Change "description" column header to "title"

## 1.32.1

-   [Workorder] update to api version 1

## 1.32.0

-   [Workorder] filter on WBS

## 1.31.0

-   [ReleaseControl] default filter for state uncheck voided

## 1.30.0

-   [Punch] add punch priority to table

## 1.29.0

-   [Allowance] Publish Allowance report PBI to prod

## 1.28.0

-   [Allowance] Implement Allowance report PBI

## 1.27.2

-   [Loop] Remove loop procosys link in sidesheet

## 1.27.1

-   [Piping & HT] Fix 404 endpoint.

## 1.27.0

-   [Apps] Deprecate /dynamic endpoints in fam, changed to /typed.

## 1.26.23

-   [Loop] Fix issue with sidesheet switching tabs and losing data in table
-   [Workorder] Add workorder analytics
-   [apps] Fix URL (only dev/test) to Fusion with updated Fusion endpoints

## 1.26.22

-   [Piping&HeatTrace] Fix link to PCS in sidesheet

## 1.26.21

-   [SCR] Remove link to PCS for in Workorder table for WOs that are not found
-   [Activities] Add new Activities app for TEST environment
-   [ProgressSummary] Change name from Progress Status and make visible in PROD env

## 1.26.20

-   [EIT] Make app visible in PROD
-   [Query] Use requiredReplyDate instead of requiredAtDate

## 1.26.19

-   [ScopeChangeRequest] Add missing Workorders from FAM/PCS to table with placeholder text
-   [EIT] Change display name to EIT79 and make visible in TEST env

## 1.26.18

-   [MarkdownEditor] Add more space to new lines in editor
-   [EIT] New EIT analytics app in DEV env
-   [Loop] Change MC status to CL status for 3D

## 1.26.17

-   [MarkdownEditor] Add hard break to editor (Shift + Enter)
-   [ScopeChangeReuqest] Show metadata for assoiciated commpkg after adding mcpkg
-   [Loop] Change from MC Status to Checklist status in sidesheet
-   [Loop] Use checklistID instead of loopId to find checklists

## 1.26.16

-   [ScopeChangeRequest] (fix) Remove limit on PCS batch tag search
-   [ScopeChangeRequest] (fix) Add commpkg automatically from batch tag search

## 1.26.15

-   [ScopeChangeRequest] Add Commpkg automatically when adding MCpkg as reference
-   [Loop] Rename Form types table header to Form type
-   [CommissioningProcedure] Fix broken link to Fusion

## 1.26.14

-   [ScopeCHangeRequest] Fix bug where user is trying to add tags with voided commpkgs

## 1.26.13

-   [TagsAnalytics] Change app visibility from dev environment to production

## 1.26.12

-   [ScopeChangeRequest] Fix version 1.26.11 showing contributors after signing
-   [ScopeChangeRequest] Remove duplicate (line) tags in single search for references
-   [ScopeChangeRequest] Don't remove references when editing attachments in edit mode

## 1.26.11

-   [ScopeChangeRequest] Show contributors after signing

## 1.26.10

-   [ScopeChangeRequest] Add "Has Contributors" filter

## 1.26.9

-   [ScopeChangeRequest] Fix batch search for line tags and adding commissioning packages automatically

## 1.26.8

-   [Query] Add description to sidesheet
-   [OperationGarden] Add link to Fusion Operation Garden app

## 1.26.7

-   [MarkdownEditor] Style font size to always be 16px.

## 1.26.6

-   [MarkdownEditor] Style line height for older SCR in markdown viewer.

## 1.26.5

-   [ScopeChangeRequest] Add placeholder text to description input
-   [MarkdownEditor] Style placeholder text accordingly
-   [Loop] Use CL status instead of MC status for Loop content in sidesheet
-   [General] Add Fusion favicon and update browser title
-   [General] Add how-to section on release management

## 1.26.4

-   [Dependencies] Update luxon to 2.5.2

## 1.26.3

-   [MarkdownEditor] Styling improvements: resize and border bottom

## 1.26.2

-   [MarkdownEditor] New package for viewing/editing rich text
-   [ScopeChangeRequest] Implement rich text editor/viewer for description field

## 1.26.1

-   [Handover] Sidesheet Tab NCr column width
-   [ScopeChangeControl] Change Origin Query validate correct project
-   [ScopeChangeControl] Reference Type McPkg enabled
-   [ScopeChangeControl] Markdown Editor for description
-   [ReleaseControl] Workflow code generalization

## 1.26.0

-   [ReleaseControl] New URL fields from FAM
-   [ReleaseControl] Loading spinners while signing steps
-   [ScopeChangeControl] Loading spinners while signing steps
-   [CommissioningTask] New Commissioning Task PBI report.

## 1.25.1

-   [ScopeChangeRequest] Change table column dates to standard format
-   [MechanicalCompletion] Fix MC to Com KPI

## 1.25.0

-   [Query] New URL fields from FAM
-   [Punch] New URL fields from FAM
-   [Workorder] New URL fields from FAM
-   [PipingAndHeattrace] New URL fields from FAM
-   [Loop] New URL fields from FAM
-   [ScopeChangeRequest] New URL fields from FAM
-   [ScopeChangeRequest] Document batch search
-   [ScopeChangeRequest] Ability to create revision on closed requests

## 1.24.3

-   [Query] Add title as subheader and remove description field in sidesheet
-   [Query] Add Description, RFC and RFO status to Commpkg tab table
-   [Query] Add better styling for long texts
-   [Punch] Add better styling for long texts

## 1.24.2

-   [ProcosysUrls] Remove pipe character from Query URL.

## 1.24.1

-   [Punch] Add description to sidesheet and make it searchable
-   [Query] Add more fields to sidesheet and update sidesheet header

## 1.24.0

-   [ScopeChangeRequest] Fix issue with when to show revision vs. void banner
-   [ScopeChangeRequest] Generic workflow signing with split sign button and comment modal
-   [Query] New Query workspace & remove old "Queries" link to Procosys
-   [Punch] Flag and category status to Garden items

## 1.23.0

-   [PipingAndHeattrace] New garden group option for Current Step (Circuit)
-   [ScopeChangeRequest] Added filter for comm.pkg
-   [ScopeChangeRequest] Change search from sequence to serial number
-   [CCHOverview] Added new CCH overview app

## 1.22.0

-   [ReleaseControl] Move workflow step up/down in admin (reorder)
-   [ReleaseControl] Fix initiate step disappearing in RC when using template
-   [ReleaseControl] Workflow admin styling adjustments
-   [ReleaseControl] Workflow admin save and close
-   [ReleaseControl] Workflow admin delete warnings
-   [PipingAndHeattrace] Hover over critical line dialog in circuit diagram

## 1.21.0

-   [ScopeChangeRequest] Add reason for voiding and reason for revision.
-   [ReleaseControl] Add empty body for void request.

## 1.20.0

-   [ReleaseControl] Added admin UI for release control workflows, steps, statuses.
-   [ReleaseControl] Changed tag search endpoint to v1 - better performance
-   [ReleaseControl] Added PCS link to mountedOn in table
-   [Punch] New workspace
-   [Workorder] Fixed bug for material status not showing correct color/text in garden view

## 1.19.1

-   [ReleaseControl/PipingAndHeattrace] Fixed bug with circuit diagram not displaying correctly

## 1.19.0

-   [CommissioningProcedure] Fix spelling mistake in app name
-   [ScopeChangeRequest] Fix spelling mistake in change category column header
-   [Loop] Add workorder tab to sidesheet
-   [Workorder] Add 3D tab to sidesheet
-   [Workorder] Fix Material available status and parse project progress differently
-   [Filter] Export memoed component
-   [ProcosysUrls] Refactor files
-   [ReleaseControl] Fix workflow step drag and drop

## 1.18.2

-   [ReleaseControl/PipingAndHeattrace] Circuit diagram: Enable "Edit isolations" button in prod

## 1.18.1

-   [ReleaseControl/PipingAndHeattrace] Fixed circuit diagram datatypes for new FAM update

## 1.18.0

-   [ReleaseControl/PipingAndHeattrace] Added critical line visualization in circuit diagram
-   [Garden] Bugfix: Update garden when filter result is empty
-   [Garden] Added last step option for garden grouping. For example HT-cable grouping in P&HT uses this
-   [Loop] Update column names from FAM
-   [Filter] Added useClickOutside on workspace filter

## 1.17.0

-   [ReleaseControl/PipingAndHeattrace] Added filters for isolated and disconnected equipment
-   [PipingAndHeattrace] Added filter for exposed HT cable duration
-   [PipingAndHeattrace] Added grouping option for circuits
-   [PipingAndHeattrace] Added grouping option for "Current step (HT)"
-   [PipingAndHeattrace] Added search option for HT cable
-   [ReleaseControl] Bugfix: Overdue release controls only apply to open state
-   [PowerBI] Bugfix: height/width fix for button
-   [Garden] Bugfix: Fixed for array grouping in hanging garden

## 1.16.0

-   [ReleaseControl/PipingAndHeattrace] Added functionality to isolate and disconnect equipment in circuit diagram
-   [Apps] Add ability to search for description/title in several workspaces
-   [PowerBI] Fix issue with clicking outside/inside of advanced filter search when trying to select a filter item
-   [PowerBI] Fix issue with filter groups overflowing out of screen when selecting multiple filter groups
-   [ReleaseControl] Remove production flag for PBI report
-   [ReleaseControl] Fixed bug with overdue release controls calculation
-   [Notification] Fix issue with SVG icon resizing
-   [PipingAndHeattrace] Added critical line filter

## 1.15.4

-   [ProgressStatus] Prod flag
-   [ReleaseControl] Remove TagMountedOn from interface and API calls to FAM. Deprecated field.
-   [ReleaseControl] Updated some Tag/HTCable fields after new FAM update.

## 1.15.3

-   [ProgressStatus] New PBI Viewer application

## 1.15.2

-   [Apps] Change Quality Deviation app link to correct Fusion App
-   [Table] Remove option to click on grouped rows

## 1.15.1

-   [Garden] Fix bug with subgrouping and total row count not being updated
-   [PBI] Remove embed of Business Case, Non Conformity, Quality Deviation, Safety Performance and instead redirect to Fusion
-   [ReleaseControl] Remove reject option from RC workflow
-   [ReleaseControl] Split description from item in Garden
-   [PipingAndHeattrace] Split description from item in Garden

## 1.15.0

-   [ReleaseControl] Added status bar KPIs
-   [ReleaseControl] Release control PBI analytics (feature flagged test)
-   [PipingAndHeattrace] Improved status bar KPIs
-   [PipingAndHeattrace] Sidesheet styling improvements (scrollbars ++)

## 1.14.0

-   [ReleaseControl] Initial prod release (feature flagged prod)

## 1.13.0

-   [ReleaseControl] Simultaneous tag/htCable search. Search and select multiple at a time.
-   [ReleaseControl] Scrollbar fix in circuit diagram + RC sidesheet
-   [ReleaseControl] System filter bugfix
-   [PipingAndHeattrace] Better error message when no access to 3D model

## 1.12.0

-   [PowerBI] Refetch token when expired
-   [ReleaseControl] Added new filters
-   [ReleaseControl] Added new table columns
-   [ReleaseControl] Added new fields for tags/htCables
-   [ReleaseControl] Added circuit diagram
-   [PipingAndHeattrace] Removed duplicate WO
-   [PipingAndHeattrace] Workorder table sorting
-   [PipingAndHeattrace] Checklist table sorting

## 1.11.0

-   [ScopeChangeRequest] Updated API call and added WO mhrs data in table
-   [FAMRequestGenerator] Extract duplicate functions from apps to a seperate package for FAM request generation
-   [Components] Remove unused code
-   [Apps] Remove unused code
-   [Workorder] Fix issue in test with dates
-   [Dependencies] Upgrade vite, @vitejs/plugin-react, typescript, ts-node @microsoft/signalr & dexie
-   [ServiceMessage] Add option to delete current service message
-   [DRC] Refactor and fix circular imports
-   [ReleaseControl] Added Scope change request references
-   [ReleaseControl] Fixed bug with release control references in edit-mode sidesheet

## 1.10.0

-   [SpoolsAnalytics] New PowerBIViewer application
-   [General] Update typing for Core/Workspace/Apps
-   [Table] Don't do automatic retries for export to excel
-   [ReleaseControl] Added auto-focus and keyboard shortcuts to sign with comment modal
-   [ReleaseControl] Fixed workflow step responsible field

## 1.9.0

-   [PowerBI] Added commissioning analytics Pbi app
-   [PowerBI] Added preservation Pbi app
-   [ReleaseControl] '...' menu only for current step
-   [ReleaseControl] Improved layout of workflow steps
-   [ReleaseControl] Split sign-button into two buttons
-   [ReleaseControl] Tabbed edit-mode
-   [ReleaseControl] Added attachment support for release controls
-   [ReleaseControl] Use person as workflow step responsible
-   [ReleaseControl] Improved tag/htCable search speed
-   [ReleaseControl] Spinner chip when application is fetching/updating
-   [ReleaseControl] Pop-up modal for sign with comment
-   [ScopeChangeRequest] Validation bugfix
-   [ScopeChangeRequest] Export to Excel
-   [Menu] Fix bug where two apps with similar names are both active
-   [Workorder] Add abortsingal to api calls
-   [Handover] Unit tests

## 1.8.1

-   [LCI] Update to use PowerBIViewer
-   [MDR] Update to use PowerBIViewer

## 1.8.0

-   [PowerBI] Automatically load PowerBI pages.
-   [PowerBI] Fix z-index on filter chip that displayed on top of sidesheets
-   [Workspace] Add support for automatically loading PowerBI pages. Configuration has changed so no pageId and - pageTitle is allowed anymore.
-   [PowerBIViewer] Add support for automatically loading PowerBI pages. Configuration has changed so no pageId - and pageTitle is allowed anymore.
-   [Apps] Remove PowerBI pages config in all apps that uses PowerBI

## 1.7.7

-   [Workspace] Changed bookmark icon in workspace
-   [ReleaseControl/ScopeChangeRequest] No default selected reference type
-   [ReleaseControl] Added completedStatusName for workflow steps
-   [Portal] Favorited menu icons visible without hovering
-   [Checklist] Update report pages
-   [SWCR] Update report pages
-   [Handover] Update report pages
-   [Punch] Update report pages

## 1.7.6

-   [ReleaseControl] Bugfix: Made it impossible to drag unsigned steps before historic steps
-   [ReleaseControl] Bugfix: Fixed so you can only unsign the previous step in a workflow (not all past signed steps)
-   [PipingAndHeattrace] Bugfix: Fixed warning triangles sometimes showing up when they shouldn't
-   [ScopeChangeRequest] Bugfix: Fixed state in edit/revision mode showing "Draft" when it is not draft
-   [ScopeChangeRequest] Bugfix: NotApplicable -> Not Applicable

## 1.7.5

-   [Workspace] Use ResizeObserver to fix table height when opening/closing filter panel
-   [ScopeChangeRequest] Show workorders with info text if SC workorders length does not equal FAM workorders

## 1.7.4

-   [MechanicalCompletion] Remove new column from API and prevent auto columns
-   [MechanicalCompletion] Remove prod check on PBI tab
-   [PowerBI] Add check for true/false string values and change to bool type
-   [ReleaseControl] No submit button in edit mode without draft state
-   [PipingAndHeattrace] Completion status bugfix

# 1.7.3

-   [Scopechange] State icon for table
-   [Portal] Add tooltip to all filters
-   [SWCR] Adjust filters
-   [Portal] Status circle top right on avatar
-   [PowerBI] Quickfilter bugfix

# 1.7.2

-   [Loop] Fix sidesheet resolver and change env to prod
-   [General] Styling fixes
-   [Filter] Finishing styling fixes
-   [ReleaseControl] Added functionality for punch and document on release controls
-   [ReleaseControl] Added scrollbars where it was missing in sidesheet
-   [ReleaseControl] Removed "X" in table when not editing
-   [ReleaseControl] Removed HT from tag search
-   [ReleaseControl] Various small improvements and bugfixes
-   [PowerBI] Remove filter icon

## 1.7.1

-   [Workorder] Performance improvements
-   [Loop] Performance improvements
-   [Handover] Schedule filter return value fixed

## 1.7.0

-   [Workorder] Change from Fusion Dataproxy to FAM
-   [Loop] Move loop to test env, update FAM views
-   [Filter] Small visual changes
-   [Portal] Topbar avatar now clickable
-   [Portal] Reduced number of icons in topbar
-   [ReleaseControl] Release control scope with tags and ht cables

## 1.6.5

-   [Scope change] ATS scope
-   [Scope change] Revisions
-   [Filter] Bugfix
-   [Loop] 3D view

## 1.6.4

-   [Scope change] Revisions
-   [Filter] Small fixes
-   [ReleaseControl] State handling improvements
-   [PipingAndHeatTrace] Compact circuit diagram

## 1.6.3

-   [Scope change] Revisions
-   [Workspace] New version of filter
-   [PowerBI] New version of filter
-   [ReleaseControl] Split scope and workflow into two steps/tabs
-   [Loop] Custom garden items, filter and search, kpis

## 1.6.2

-   [3D] Loading model Full-Pro
-   [WorkPreparation] - New page title for STR/HUPR
-   [Apps] - Date fix, use year instead of weekYear
-   [Handover] - Update status cell in table
-   [Table] - Update column picker styling

## 1.6.1

-   [3D] Production hot fix
-   [ReleaseControl] Missing "C" in dot in garden group header

## 1.6.0

-   [Filter] V2 compact filter
-   [Portal] Central URL object for PCS
-   [Table] Redesign of status cell & better typing for custom cell props
-   [Loop] Loop workspace for dev environment
-   [PunchDev] Punch workpsace for dev environment
-   [Bookmarks] Fix invalidate bug
-   [Bookmarks] Fix styling of sidesheet and remove prod check
-   [ScopeChange] Automatically add tag from comm pkg
-   [PipingAndHeatTrace] Pipetest PowerBI analytics
-   [PipingAndHeatTrace] Sidesheet dropdown with link to PCS
-   [PipingAndHeatTrace] Clickable workorders in table
-   [PipingAndHeatTrace] Checklist table fixes
-   [PipingAndHeatTrace] Pipetest PowerBI analytics
-   [PipingAndHeatTrace] Pipetest description in sidesheet title
-   [PipingAndHeatTrace] Styling adjustments
-   [PipingAndHeatTrace] 3D Viewer
-   [3D] Show icon on electro tags
-   [3D] Update to new reveal/echo version
-   [ReleaseControl] Scrollbar in sidesheet
-   [ReleaseControl] Due date selection bug fix
-   [ReleaseControl] Fetch workflows/templates from API
-   [ReleaseControl] Warning dialogue when exiting sidesheet create form with unsaved changes
-   [ReleaseControl] Improved state management

## 1.5.0

-   [PipingAndHeatTrace] New custom group header for HT cables
-   [ReleaseControl] Initial release to test
-   [Workspace] Search in workspace
-   [Scope change] Bugfix
-   [Portal] Help pages

## 1.4.9

-   [Workspace] Fix column picker resetting when filtering

# 1.4.8

-   [Scope change] Add punch list items as reference
-   [Scope change] Update table config, fix some crashes
-   [Portal] Bookmarks sidesheet

# 1.4.7

-   [Scope change] Fix null dates

# 1.4.6

-   [Scope change] Hotfix production work orders failing to load
-   [PipingAndHeatTrace] Changed Piping RFC (Unique HT) to HT cable RFC. Used new HT cable dates to group by

# 1.4.5

-   [MC] Production flag for analytics tab
-   [Portal] Change nginx version to fix dynatrace
-   [PipingAndHeatTrace] - 3D for tags

## 1.4.4

-   [MC] Analytics tab
-   [Garden] Fix horizontal scroll

## 1.4.3

-   [Portal] Access check hotfix
-   [MC] Now in production
-   [Table] Bugfixes

## 1.4.2

-   [Scope change] Batch import tags and commPkgs
-   [Sidesheet] Sidesheet configuration
-   [Workspace] Workspace configuration
-   [Work order] Added KPI's
-   [Workspace] Small ui adjustments
-   [Workspace] Added support for help pages
-   [ModuleViewer] Possibility to turn on/off the rest of the 3D model

## 1.4.1

-   [PipingAndHeatTrace] Null-check bug fix. Updated app after FAM update.
-   [Portal] Add version to banner
-   [Portal] Navigation breadcrumbs

## 1.4.0

-   [Workspace] Highlight active item in garden and table
-   [Scope change] Garden config
-   [Scope change] Bugfixes
-   [Assignments] Bugfix
-   [PowerBI] Fix filter limitation with using basic filter
-   [PowerBI] Fix rerender on filter group when filter item checked/unchecked
-   [GardenUtils] Fix popover that is stuck when page rerenders
-   [Workspace] Use shortname for bookmarks when saving
-   [PipingAndHeatTrace] Remove double slash from base url

## 1.3.1

-   [Scopechange] Form bugfixes
-   [PipingAndHeatTrace] Bugfix for calculating status on new tests

# 1.3.0

-   [Workorder] Filter by progress & follow up status
-   [Workorder] Fix remaining hours on current week column
-   [Workorder] Implement popover
-   [SWCR] Sort date columns so "No Date" column appear first
-   [Mechanical Completion] Use planned dates instead of forecast dates
-   [Mechanical Completion] Implement popover
-   [Handover] Implement popover
-   [GardenUtils] Popover component for virtual garden items
-   [PowerBI] Reset filters when filter group is closed
-   [Table] Fix sorting by number
-   [Sidesheet] Add warning on unsaved changes
-   [ScopeChange] Discipline as column
-   [ScopeChange] Bugfixes

## 1.2.1

-   [Workspace] Config for default collapsing groups in workspace
-   [Scopechange] Added support for materials
-   [MC] Filter and table config
-   [Handover] Initial grouping set to forecast
-   [Discipline release control] Default collapse subgroups
-   [Portal] - Sidesheet manifest and loader. (WIP)

---

## 1.2.0

-   [Workspace] Use bookmarks manager for garden, table & pbi
-   [App Manifest] Change groupe type from array string to string
-   [PowerBIViewer] Move bookmarks icon
-   [Mechanical Completion] Table and filter config
-   [Mechanical Completion] Change from dev to test env
-   [Garden] Fix issue with scrollbar when opening filter panel
-   [Scopechange] Guesstimate discipline guesses
-   [Scopechange] Bugfixes
-   [Scopechange] Create form now in sidesheet
-   [PipingAndHeatTrace] HT sidesheet and garden custom group view for HT
-   [PipingAndHeatTrace] Workorder tab in sidesheet fixes
-   [PipingAndHeatTrace] Step name filter
-   [PipingAndHeatTrace] Disconnected cables
-   [PipingAndHeatTrace] Ghost cable to display junction box with no cable

## 1.1.3

-   [Client] Hotfix auth issue
-   [Installation] new report in devlopment
-   [LCI Hanging Garden] Context in report
-   [Business Case] Contexts report
-   [Safety Performance] Contexts report

## 1.1.2

-   [Scopechange] DCN changed to DCR
-   [Workspace] Filter improvements
-   [Scopechange] Filter on guesstimate
-   [Scopechange] Bugfixes
-   [Portal] Sidesheet now has higher width
-   [Bookmarks Manager] Package for persisting filter and other states
-   [PBI Viewer] Use Bookmarks Manager
-   [Workspace] Use Bookmarks Manager for PBI reports
-   [MC Garden] Release of MC Garden
-   [GardenUtils] Refactor and use react-query

## 1.1.1

-   [ScopeChange] Bugfixes
-   [Assignments] Filter closed assignments

## 1.1.0

-   [APPS] - Release Fusion PBI reports
-   [Portal] - Persisting menu state
-   [ScopeChange] - Refactor

## 1.0.1

### PROD

-   [Scopechange] bugfixes
-   [SWCR Garden] Fix scrolling when opening sidesheet
-   [Work order Garden] Fix scrolling when opening sidesheet

## 1.0.0

### PROD

-   [Scopechange] bugfixes
-   [Assignments] release
-   [Workorder] release
-   [SWCR] release
-   [Handover] release
-   [PipingAndHeatTrace] - Visual adjustments and Piping RFC (Unique HT) grouping

## 0.4.2

### PROD

-   [ScopeChange] Bugfixes
-   [Notifications] Remove group by
-   [Assignments] Release

## 0.4.1

### PROD

-   [ScopeChange] Bugfixes
-   [Notifications] Fixed redirect not working
-   [Workspace] Bugfixes
-   [ScopeChange] Added powerBi analytics

## 0.4.0

### Prod

-   [ScopeChange] - Data-bars in table
-   [ScopeChange] - Work order table adjustments
-   [ScopeChange] - Fix save button disappear in draft
-   [ScopeChange] - Fix scrollbar tabs
-   [ScopeChange] - No attachments linked
-   [Core] - Removal of unused packages and package bumps.
-   [PipingAndHeatTrace] - Insulation boxes tab and Single line diagram
-   [Portal] - Notifications and assignments
-   [Workspace] - Support for PowerBi reports in workspace
-   [Garden] - Grouping Enhancements

### Test

-   [Handover] - Added analytic PowerBi report.
-   [WorkOrder] - remove min-width styling table
-   [Handover] - remove min-width styling table
-   [SWCR] - Updates
-   [SWCR] - PowerBi report added to workspace
-   [Handover] - PowerBi report added to workspace
-   ***

## 0.3.0

### Prod

-   [PipingAndHeatTrace] - Release.
-   [PowerBiFilter] - new styles and virtualization.
-   [Filter] - Count optimization

---

## 0.2.6

### Prod

-   [ScopeChange] - Official release.
-   [Workspace] - Filter performance fix.
-   [Installation] - Renamed ISO to "Insulation for Installation"
-   [WorkPreparation] added STR/HUPR page.
-   [Portal] - "Queries and requests" apps removed for now

### Test

-   [SWCR] - Alpha Release for testing
-   [Handover] - Alpha Release for testing

---

## 0.2.5

### Prod

-   [PowerBIViewer] - **BUG** - default page selection
-   [Checklist] - PowerBiViewer
-   [Punch] - PowerBiViewer
-   [Portal] - Styles update

### Test

-   [Workorder] - chore: add size icon, flag, progress to wo item
-   [Garden] - Highlight selected garden item
-   [SWCR] - Virtual garden
-   [DataFactory] - Optional access check
-   [Handover] - General Updated, filter items, styling
-   [PipingAndHeatTrace] - released to test

---

## 0.2.3-alpha

### Prod

-   Installation PBI
-   Work preparation PBI
-   New menu
-   Scopechange
-   Moved create menu to topbar

---

## 0.2.2-alpha

### Prod

-   Construction Progress

### Test

-   Workspace refresh functionality.
-   Workspace UI updates

---

## 0.2.1-alpha

### Test General

-   Fix fusion scopes
-   Update PBI reports

---

## 0.2.0-alpha

### General

-   Workspace UI updates
-   KPI
-   Bugfix
-   PowerBI filter
-   Remove dummy tasks and devbar from PROD
-   All urls added to PROD

### Scope change

-   Release Scope change in test

---

## 0.1.1-alpha

### Changes

-   Readme Update (Links)
-   Labeler update.

#### Portal

-   Homepage Background
-   Search in top-bar (disabled)
-   Tasks/Dummy tasks
-   Dependencies update

#### Construction Progress

-   Change punch analytics uri

#### WorkSpace / PageViewer

-   Custom array cell type in Table
-   Support for custom header renderer in config Table
-   Support of cancellation when redirect to other view
-   General UI updates

---

## 0.1.0-alpha

### Add

-   Initial alpha release containing client and apps
-   Main apps are WorkSpace, PowerBI and PageViewer/Dashboards
-   External Links

#### PageViewer AppsConfigurations

-   Commissioning

#### PowerBI AppsConfigurations

-   Non-comformacy
-   Quality deviation
-   Queries Analytics
-   MDR analytics
-   LCI hanging garden
-   Safety Performance
-   Business case

#### External Links

-   [Queries](https://procosys.equinor.com/JOHAN_CASTBERG/Search?searchType=Query)
-   [Meetings](https://fusion.equinor.com/apps/meetings)
-   [Review](https://fusion.equinor.com/apps/reviews/255d8c0a-7893-4c21-ab42-62c652ea8129)
-   [Preservation](https://procosys.equinor.com/JOHAN_CASTBERG/Preservation)
-   [Org chart](https://fusion.equinor.com/apps/pro-org/3cf72ff9-c50f-4e94-ba79-31721ba42dec/chart)

### Commissioning

This release contains the alpha-mvp of the Commissioning app.
