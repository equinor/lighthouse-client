# Changelog Castberg Project Portal

All notable changes to this project will be documented in this file.

The changelog is valid starting with Castberg Project Portal v0.1.0-alpha.

## 1.6.3
- [Scope change] Revisions
- [Workspace] New version of filter
- [PowerBI] New version of filter
- [ReleaseControl] Split scope and workflow into two steps/tabs
- [Loop] Custom garden items, filter and search, kpis

## 1.6.2
- [3D]  Loading model Full-Pro
- [WorkPreparation] - New page title for STR/HUPR
- [Apps] - Date fix, use year instead of weekYear
- [Handover] - Update status cell in table
- [Table] - Update column picker styling
## 1.6.1
- [3D]  Production hot fix
- [ReleaseControl] Missing "C" in dot in garden group header

## 1.6.0
- [Filter]  V2 compact filter
- [Portal] Central URL object for PCS
- [Table] Redesign of status cell & better typing for custom cell props
- [Loop] Loop workspace for dev environment
- [PunchDev] Punch workpsace for dev environment
- [Bookmarks] Fix invalidate bug
- [Bookmarks] Fix styling of sidesheet and remove prod check
- [ScopeChange] Automatically add tag from comm pkg
- [PipingAndHeatTrace] Pipetest PowerBI analytics
- [PipingAndHeatTrace] Sidesheet dropdown with link to PCS
- [PipingAndHeatTrace] Clickable workorders in table
- [PipingAndHeatTrace] Checklist table fixes
- [PipingAndHeatTrace] Pipetest PowerBI analytics
- [PipingAndHeatTrace] Pipetest description in sidesheet title
- [PipingAndHeatTrace] Styling adjustments
- [PipingAndHeatTrace] 3D Viewer
- [3D] Show icon on electro tags
- [3D] Update to new reveal/echo version
- [ReleaseControl] Scrollbar in sidesheet
- [ReleaseControl] Due date selection bug fix
- [ReleaseControl] Fetch workflows/templates from API
- [ReleaseControl] Warning dialogue when exiting sidesheet create form with unsaved changes
- [ReleaseControl] Improved state management
  
## 1.5.0
- [PipingAndHeatTrace] New custom group header for HT cables
- [ReleaseControl] Initial release to test
- [Workspace] Search in workspace
- [Scope change] Bugfix
- [Portal] Help pages

## 1.4.9 
- [Workspace] Fix column picker resetting when filtering

# 1.4.8
- [Scope change] Add punch list items as reference
- [Scope change] Update table config, fix some crashes
- [Portal] Bookmarks sidesheet


# 1.4.7
- [Scope change] Fix null dates

# 1.4.6
- [Scope change] Hotfix production work orders failing to load
- [PipingAndHeatTrace] Changed Piping RFC (Unique HT) to HT cable RFC. Used new HT cable dates to group by

# 1.4.5
- [MC] Production flag for analytics tab
- [Portal] Change nginx version to fix dynatrace
- [PipingAndHeatTrace] - 3D for tags

## 1.4.4
- [MC] Analytics tab
- [Garden] Fix horizontal scroll

## 1.4.3
- [Portal] Access check hotfix
- [MC] Now in production
- [Table] Bugfixes


## 1.4.2
- [Scope change] Batch import tags and commPkgs
- [Sidesheet] Sidesheet configuration
- [Workspace] Workspace configuration
- [Work order] Added KPI's
- [Workspace] Small ui adjustments
- [Workspace] Added support for help pages
- [ModuleViewer] Possibility to turn on/off the rest of the 3D model


## 1.4.1
- [PipingAndHeatTrace] Null-check bug fix. Updated app after FAM update.
- [Portal] Add version to banner
- [Portal] Navigation breadcrumbs

## 1.4.0
- [Workspace] Highlight active item in garden and table
- [Scope change] Garden config
- [Scope change] Bugfixes
- [Assignments] Bugfix
- [PowerBI] Fix filter limitation with using basic filter
- [PowerBI] Fix rerender on filter group when filter item checked/unchecked
- [GardenUtils] Fix popover that is stuck when page rerenders
- [Workspace] Use shortname for bookmarks when saving
- [PipingAndHeatTrace] Remove double slash from base url

## 1.3.1
- [Scopechange] Form bugfixes
- [PipingAndHeatTrace] Bugfix for calculating status on new tests

# 1.3.0
- [Workorder]  Filter by progress & follow up status
- [Workorder] Fix remaining hours on current week column
- [Workorder] Implement popover
- [SWCR] Sort date columns so "No Date" column appear first
- [Mechanical Completion] Use planned dates instead of forecast dates
- [Mechanical Completion] Implement popover
- [Handover] Implement popover
- [GardenUtils] Popover component for virtual garden items
- [PowerBI] Reset filters when filter group is closed
- [Table] Fix sorting by number
- [Sidesheet] Add warning on unsaved changes
- [ScopeChange] Discipline as column
- [ScopeChange] Bugfixes


## 1.2.1
- [Workspace] Config for default collapsing groups in workspace
- [Scopechange] Added support for materials
- [MC] Filter and table config
- [Handover] Initial grouping set to forecast
- [Discipline release control] Default collapse subgroups
- [Portal] - Sidesheet manifest and loader. (WIP)

****
## 1.2.0
-  [Workspace] Use bookmarks manager for garden, table & pbi
-  [App Manifest] Change groupe type from array string to string
-  [PowerBIViewer] Move bookmarks icon
-  [Mechanical Completion] Table and filter config
-  [Mechanical Completion] Change from dev to test env
-  [Garden] Fix issue with scrollbar when opening filter panel
-  [Scopechange] Guesstimate discipline guesses
-  [Scopechange] Bugfixes
-  [Scopechange] Create form now in sidesheet
-  [PipingAndHeatTrace]  HT sidesheet and garden custom group view for HT
-  [PipingAndHeatTrace] Workorder tab in sidesheet fixes
-  [PipingAndHeatTrace] Step name filter
-  [PipingAndHeatTrace] Disconnected cables
-  [PipingAndHeatTrace] Ghost cable to display junction box with no cable

## 1.1.3
- [Client] Hotfix auth issue
- [Installation] new report in devlopment
- [LCI Hanging Garden]  Context in report
- [Business Case] Contexts report
- [Safety Performance] Contexts report

## 1.1.2
- [Scopechange] DCN changed to DCR
- [Workspace] Filter improvements
- [Scopechange] Filter on guesstimate
- [Scopechange] Bugfixes
- [Portal] Sidesheet now has higher width
- [Bookmarks Manager] Package for persisting filter and other states
- [PBI Viewer] Use Bookmarks Manager
- [Workspace] Use Bookmarks Manager for PBI reports
- [MC Garden] Release of MC Garden
- [GardenUtils] Refactor and use react-query


## 1.1.1
- [ScopeChange] Bugfixes
- [Assignments] Filter closed assignments

## 1.1.0
- [APPS] - Release Fusion PBI reports
- [Portal] - Persisting menu state
- [ScopeChange] - Refactor

## 1.0.1

### PROD
- [Scopechange] bugfixes
- [SWCR Garden] Fix scrolling when opening sidesheet
- [Work order Garden] Fix scrolling when opening sidesheet

## 1.0.0

### PROD
- [Scopechange] bugfixes
- [Assignments] release
- [Workorder] release
- [SWCR] release
- [Handover] release
- [PipingAndHeatTrace] - Visual adjustments and Piping RFC (Unique HT) grouping

## 0.4.2

### PROD
- [ScopeChange] Bugfixes
- [Notifications] Remove group by
- [Assignments] Release


## 0.4.1

### PROD
- [ScopeChange] Bugfixes
- [Notifications] Fixed redirect not working
- [Workspace] Bugfixes
- [ScopeChange] Added powerBi analytics

## 0.4.0

### Prod

- [ScopeChange] - Data-bars in table
- [ScopeChange] - Work order table adjustments
- [ScopeChange] - Fix save button disappear in draft
- [ScopeChange] - Fix scrollbar tabs
- [ScopeChange] - No attachments linked 
- [Core] - Removal of unused packages and package bumps.
- [PipingAndHeatTrace] - Insulation boxes tab and Single line diagram
- [Portal] - Notifications and assignments
- [Workspace] - Support for PowerBi reports in workspace 
- [Garden] - Grouping Enhancements 

### Test
- [Handover] - Added analytic PowerBi report.
- [WorkOrder] - remove min-width styling table
- [Handover] - remove min-width styling table
- [SWCR] - Updates
- [SWCR] - PowerBi report added to workspace
- [Handover] - PowerBi report added to workspace
- 
---

## 0.3.0

### Prod
- [PipingAndHeatTrace] - Release.
- [PowerBiFilter] - new styles and virtualization.
- [Filter] - Count optimization

--- 
## 0.2.6

### Prod
- [ScopeChange] - Official release.
- [Workspace] - Filter performance fix.
- [Installation] - Renamed ISO to "Insulation for Installation"  
- [WorkPreparation] added STR/HUPR page.
- [Portal] - "Queries and requests" apps removed for now

### Test
- [SWCR] - Alpha Release for testing
- [Handover] - Alpha Release for testing


--- 
## 0.2.5

### Prod
- [PowerBIViewer] - **BUG** - default page selection
- [Checklist] - PowerBiViewer
- [Punch] - PowerBiViewer
- [Portal] - Styles update
### Test
- [Workorder] - chore: add size icon, flag, progress to wo item
- [Garden] - Highlight selected garden item
- [SWCR] - Virtual garden
- [DataFactory] - Optional access check
- [Handover] - General Updated, filter items, styling
- [PipingAndHeatTrace] - released to test

--- 
  

## 0.2.3-alpha

### Prod
- Installation PBI
- Work preparation PBI
- New menu
- Scopechange
- Moved create menu to topbar
---
## 0.2.2-alpha

### Prod
- Construction Progress

### Test
- Workspace refresh functionality.
- Workspace UI updates
---
## 0.2.1-alpha
### Test General
- Fix fusion scopes
- Update PBI reports
- ---
## 0.2.0-alpha

### General
- Workspace UI updates
- KPI
- Bugfix
- PowerBI filter
- Remove dummy tasks and devbar from PROD
- All urls added to PROD

### Scope change
- Release Scope change in test

---
## 0.1.1-alpha

### Changes
- Readme Update (Links)
- Labeler update.
#### Portal
- Homepage Background
- Search in top-bar (disabled)
- Tasks/Dummy tasks
- Dependencies update
#### Construction Progress
- Change punch analytics uri 

#### WorkSpace / PageViewer
- Custom array cell type in Table
- Support for custom header renderer in config Table
- Support of cancellation when redirect to other view 
- General UI updates

---
## 0.1.0-alpha

### Add
- Initial alpha release containing client and apps
- Main apps are WorkSpace, PowerBI and PageViewer/Dashboards
- External Links
  
#### PageViewer AppsConfigurations
- Commissioning

#### PowerBI AppsConfigurations
  -  Non-comformacy 
  -  Quality deviation 
  -  Queries Analytics
  -  MDR analytics
  -  LCI hanging garden
  -  Safety Performance
  -  Business case

#### External Links
  - [Queries](https://procosys.equinor.com/JOHAN_CASTBERG/Search?searchType=Query)
  - [Meetings](https://fusion.equinor.com/apps/meetings)
  - [Review](https://fusion.equinor.com/apps/reviews/255d8c0a-7893-4c21-ab42-62c652ea8129)
  - [Preservation](https://procosys.equinor.com/JOHAN_CASTBERG/Preservation)
  - [Org chart](https://fusion.equinor.com/apps/pro-org/3cf72ff9-c50f-4e94-ba79-31721ba42dec/chart)


### Commissioning
This release contains the alpha-mvp of the Commissioning app.
