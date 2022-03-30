import { FusionPowerBiOptions } from "../Types/State";
import { getDefault } from "../Utils/getDefault";

describe('getDefault report', () => {
    const reports: FusionPowerBiOptions[] = [
        {
            reportURI: "test1",
            pages: [
                {
                    pageTitle: "test",
                    pageId: "1",
                    default: true,
                }
            ]
        }
    ]
    it("should get report if default page is set", () =>{
        const result = getDefault(reports) 
        expect(result.report?.reportURI).toStrictEqual( "test1");
        expect(result.page?.pageId).toStrictEqual("1");
    })

    it("should get report if default page is not set, and page should be undefined", () =>{
        reports[0].pages[0].default = false;
        const result = getDefault(reports) 
        expect(result.report?.reportURI).toStrictEqual( "test1");
        expect(result.page).toStrictEqual(undefined);
    })

    it("should return undefined", () =>{
        const result = getDefault([]) 
        expect(result.report).toStrictEqual(undefined);
        expect(result.page).toStrictEqual(undefined);
    })
});