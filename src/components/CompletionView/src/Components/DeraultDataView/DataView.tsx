import { useEffect, useState } from "react";
import { useDataContext } from "../../Context/DataProvider";
import { DataEntry, DataGrid, Description, Section, Title, Wrapper } from "./DataView.styles";


export function DataView(): JSX.Element {
    const { data, itemId, viewOptions } = useDataContext()
    const [selectedData, setSelectedData] = useState<any>(undefined)

    useEffect(() => {
        setSelectedData(data.find((item) => item[viewOptions?.objectIdentifierKey || ""] === itemId))
    }, [data, itemId])

    return (
        <div>
            {
                selectedData && viewOptions && <>
                    <Wrapper>
                        {
                            viewOptions.title && <Section>
                                <label>{viewOptions.title.label}</label>
                                <Title>{selectedData[viewOptions.title.key]}</Title>
                            </Section>
                        }

                        {
                            viewOptions.description && <Description>
                                <strong>{viewOptions.description.label}</strong>
                                <p>{selectedData[viewOptions.description.key]}</p>
                            </Description>
                        }

                        <Section>
                            <DataGrid>

                                {Object.keys(selectedData).map(key => {
                                    if (key === viewOptions.title?.key || key === viewOptions.description?.key) return null
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