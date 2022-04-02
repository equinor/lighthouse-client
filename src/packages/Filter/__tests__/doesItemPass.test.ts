import { ScopeChangeRequest } from "../../../apps/ScopeChangeRequest/Types/scopeChangeRequest"
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





