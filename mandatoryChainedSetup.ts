interface Config {
    tableOptions: TableOptions;
    filterOptions: FilterOptions;
    gardenOptions: GardenOptions;
}

interface TableOptions {}
interface GardenOptions {}
interface FilterOptions {}

function generateDefaultTableOptions(): TableOptions {
    return {};
}

function createWorkSpace() {
    let obj: Config;

    return {
        registerTableOptions: registerTableOptions,
    };

    function registerTableOptions(tableOptions?: TableOptions) {
        obj.tableOptions = tableOptions ?? generateDefaultTableOptions();
        return {
            registerFilterOptions: registerFilterOptions,
        };
    }
    function registerFilterOptions(filterOptions?: FilterOptions) {
        obj.filterOptions = filterOptions ?? generateDefaultTableOptions();
        return {
            registerGardenOptions: registerGardenOptions,
        };
    }
    /**
     * Last config
     */
    function registerGardenOptions(gardenOptions?: GardenOptions) {
        obj.gardenOptions = gardenOptions ?? generateDefaultTableOptions();

        return obj;
    }
}

createWorkSpace().registerTableOptions().registerFilterOptions().registerGardenOptions();
