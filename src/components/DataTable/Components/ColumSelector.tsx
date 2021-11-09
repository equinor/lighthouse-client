import { Checkbox, Popover } from "@equinor/eds-core-react";
import styled from "styled-components";
import { useTableContext } from "../Context/TableProvider";
import { HeaderData } from "../Utils/generateHeaderKeys";

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
interface ColumSelectorProps {
    anchorEl: HTMLButtonElement | null,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,

}

export function ColumSelector({ anchorEl, isOpen, setIsOpen, }: ColumSelectorProps) {
    const { headers, awaitableHeaders, setHeaderData } = useTableContext();

    function handleCheckChange(header: HeaderData) {
        if (headers.includes(header)) {
            setHeaderData(headers.filter(item => item.key !== header.key))
        } else {
            setHeaderData([...headers, header])
        }
    }

    return (
        <Popover
            open={isOpen}
            anchorEl={anchorEl}
            id="default-popover"
            onClose={() => { setIsOpen(false) }}
            placement="bottom-end"
        >
            <Popover.Title>
                Add columns
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