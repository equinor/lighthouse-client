import { getActiveFilterGroupArray } from '../Utils';
const activeFilters = {
    'Work type': [],
    'Tag test': [],
    'Sub system': [],
    'Sub discipline': [],
    'Sub area': [],
    'Project phase': [],
    'Project Milestone': [],
    'Procurement Pack': [],
    'Main planning area': [],
    Phase: [],
    'Personal Sort Field': [],
    PAU: [],
    Module: [],
    'Material allocation phase': [],
    'Main category': [],
    'Main area': [],
    FAS: [],
    'HU zone': [],
    Discipline: [],
    'Cost center department': [],
    'Activity role': [],
    'Activity number': [],
    Wbs: ['11A05D20'],
};

describe('Get active filter groups', () => {
    it('should return correct filter group keys for active filters', () => {
        const expected = ['Wbs'];

        const temp = getActiveFilterGroupArray(activeFilters);
        expect(temp).toHaveLength(1);
        expect(temp[0]).toEqual(expected[0]);
    });
});
