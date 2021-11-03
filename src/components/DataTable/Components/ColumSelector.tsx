import { Checkbox, Popover } from "@equinor/eds-core-react";
import styled from "styled-components";
import { useTableContext } from "../Context/TableProvider";
import { HeaderData } from "../Utils/generateHeaderKeys";

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
function getHeaderDataKeys(HeaderData: HeaderData[]) {
    return HeaderData.map(i => i.key)

}

export function ColumSelector({ anchorEl, isOpen, setIsOpen, headerData, }: { anchorEl: HTMLButtonElement | null, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, awaitableHeaders: HeaderData[], headerData: HeaderData[] }) {
    const { headers, awaitableHeaders, setHeaderData } = useTableContext();

    function handleCheckChange(header: HeaderData) {
        if (headerData.includes(header)) {
            setHeaderData(headerData.filter(item => item.key !== header.key))
        } else {
            setHeaderData([...headerData, header])
        }
    }

    console.log(headers, awaitableHeaders)

    return (
        <Popover
            open={isOpen}
            anchorEl={anchorEl}
            id="default-popover"
            onClose={() => { setIsOpen(false) }}
            placement="bottom-end"
        >
            <Popover.Title>
                Select data rows
            </Popover.Title>
            <Popover.Content>
                <ContentWrapper>
                    {
                        awaitableHeaders.map(header => (
                            <Checkbox
                                key={header.key}
                                label={header.title}
                                title={header.title}
                                value={header.key}
                                checked={headers.findIndex(item => item.key === header.key) !== -1}
                                onChange={() => { handleCheckChange(header) }} />
                        ))
                    }
                </ContentWrapper>
            </Popover.Content>
        </Popover >

    )
}