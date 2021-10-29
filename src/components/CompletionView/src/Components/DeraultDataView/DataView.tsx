import { useEffect, useState } from "react";
import { useDataContext } from "../../Context/DataProvider";
import { DataEntry, DataGrid, Description, Section, Title, Wrapper } from "./DataView.styles";


interface DataViewProps<T> {
    data?: T
}

interface Checklist {
    Area__Id: string;
    CommPhase__Id: string;
    CommPkgNo: string;
    CommPriority1__Id: string;
    CommPriority2__Id: string;
    CommPriority3__Id: string;
    CommissioningHandoverStatus: number
    Description: string;
    Id: number
    McStatus__Id: string;
    OperationHandoverStatus: string;
    PlannedCompleted: string;
    PlannedStartup: string;
    Responsible__Id: string;
    Status__Id: string;
}


interface ViewOptions<T> {
    title: {
        key: keyof T;
        label: string;
    }
    description: {
        key: keyof T;
        label: string;
    }
}

const config: ViewOptions<Checklist> = {
    title: {
        key: "CommPkgNo",
        label: "Comm. Package:"
    },
    description: {
        key: "Description",
        label: "Description"
    },

}

export function DataView(): JSX.Element {
    const { data, itemId } = useDataContext()
    const [selectedData, setSelectedData] = useState<any>(undefined)

    useEffect(() => {
        console.log(itemId)
        setSelectedData(data.find((item) => item["CommPkgNo"] === itemId))
    }, [data, itemId])
    return (
        <div>
            {
                selectedData && <>
                    <Wrapper>
                        <Section>
                            <label>{config.title.label}</label>
                            <Title>{selectedData[config.title.key]}</Title>
                        </Section>

                        <Description>
                            <strong>{config.description.label}</strong>
                            <p>{selectedData[config.description.key]}</p>
                        </Description>

                        <Section>
                            <DataGrid>

                                {Object.keys(selectedData).map(key => {
                                    if (key === config.title.key || key === config.description.key) return null
                                    return (
                                        <DataEntry>
                                            <strong>{key}:</strong>
                                            <p>{selectedData[key] || "-"} </p>
                                        </DataEntry>
                                    )
                                })}
                            </DataGrid>
                        </Section>
                    </Wrapper>

                </>
            }
        </div>
    );
}