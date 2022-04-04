import { ScopeChangeRequest } from "../../../apps/ScopeChangeRequest/Types/scopeChangeRequest"
import { searchAcrossFilterGroups } from "../functions/searchAcrossFilterGroups"
import { FilterGroup, ValueFormatterFilter } from "../Hooks/useFilterApi"

const items: ScopeChangeRequest[] =
    [
        {
            changeCategory: { name: "Hidden Carry Over", id: "2" },
        },
        {
            changeCategory: { name: "Quality", id: 3 }
        }
    ] as ScopeChangeRequest[]



const valueFormatter: ValueFormatterFilter<ScopeChangeRequest> = { name: "Change category", valueFormatter: ({ changeCategory }) => changeCategory.name }

describe('Free text search across one filtergroup', () => {
    it("One item should pass", () => {
        const result = searchAcrossFilterGroups([valueFormatter], items, "hidden")
        expect(result.length).toBe(1)
    })
})


const mockRequests: ScopeChangeRequest[] =
    [
        {
            changeCategory: { name: "Hidden Carry Over", id: "2" },
            title: "Mock request"
        },
        {
            changeCategory: { name: "Quality", id: 3 },
            title: "Mock request #2"
        },
        {
            changeCategory: { name: "Late design change", id: 4 },
            title: "Request #3"
        }
    ] as ScopeChangeRequest[]



const valueFormatters: ValueFormatterFilter<ScopeChangeRequest>[] = [
    { name: "Change category", valueFormatter: ({ changeCategory }) => changeCategory.name },
    { name: "Title", valueFormatter: ({ title }) => title }
]

describe('Free text search across multiple filtergroups', () => {
    it("Both items should pass", () => {
        const result = searchAcrossFilterGroups(valueFormatters, mockRequests, "mock")
        expect(result.length).toBe(2)
    })
})

