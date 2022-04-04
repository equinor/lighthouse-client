import { ScopeChangeRequest } from "../../../apps/ScopeChangeRequest/sTypes/scopeChangeRequest"
import { doesItemPassFilter } from "../functions/doesItemPass"
import { FilterGroup, ValueFormatterFilter } from "../Hooks/useFilterApi"

const item: ScopeChangeRequest = {
    changeCategory: { name: "Hidden Carry Over", id: "2" },
} as ScopeChangeRequest


const filter: FilterGroup = {
    name: "Change category",
    values: ["Hidden Carry Over"]
}
const valueFormatter: ValueFormatterFilter<ScopeChangeRequest> = { name: "Change category", valueFormatter: ({ changeCategory }) => changeCategory.name }

describe('Basic filter item', () => {
    it("Should not pass", () => {
        const result = doesItemPassFilter(item, [filter], [valueFormatter])
        expect(result).toBeFalsy()
    })
})


const arrayFilter: FilterGroup = {
    name: "WorkflowSteps",
    values: [null]
}
const arrayItem: ScopeChangeRequest = {
    workflowSteps: []
} as unknown as ScopeChangeRequest

const valueFormatterArray: ValueFormatterFilter<ScopeChangeRequest> = { name: "WorkflowSteps", valueFormatter: () => [] }
describe("Array items", () => {
    it("Should not pass", () => {
        const result = doesItemPassFilter(arrayItem, [arrayFilter], [valueFormatterArray])
        expect(result).toBeFalsy()
    })
})


const arrayFilterWithMultiple: FilterGroup = {
    name: "WorkflowSteps",
    values: ["step1"]
}
const arrayItemWithMultiple: ScopeChangeRequest = {
    workflowSteps: [{ name: "step1" }, { name: "step2" }]
} as ScopeChangeRequest
const valueFormatterArrayWithMultiple: ValueFormatterFilter<ScopeChangeRequest> = { name: "WorkflowSteps", valueFormatter: ({ workflowSteps }) => workflowSteps.map(({ name }) => name) }

describe("Array items with multiple", () => {
    it("Should pass", () => {
        const result = doesItemPassFilter(arrayItemWithMultiple, [arrayFilterWithMultiple], [valueFormatterArrayWithMultiple]);
        expect(result).toBeTruthy();
    })
})


const nullValuesTestFilterGroup: FilterGroup = {
    name: "Category",
    values: [null]
}

const nullValueTestData: ScopeChangeRequest =
    {
        changeCategory: { id: 1, name: null }
    } as unknown as ScopeChangeRequest


const valueFormatterArrayNull: ValueFormatterFilter<ScopeChangeRequest> = { name: "Category", valueFormatter: ({ changeCategory }) => changeCategory.name }



describe("Null value to not pass", () => {
    it("Should not pass", () => {
        const result = doesItemPassFilter(nullValueTestData, [nullValuesTestFilterGroup], [valueFormatterArrayNull])
        expect(result).toBeFalsy();
    })
})
