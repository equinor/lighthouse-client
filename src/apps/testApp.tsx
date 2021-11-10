import { Checkbox, Typography } from "@equinor/eds-core-react";
import styled from "styled-components";



export const RowCheckbox = styled(Typography)`
    padding: 0 !important;
    color: red;
`;

export const Check = styled(Checkbox)`
    padding: 0px;
    margin-top: -4px;
    display: block;
    height: 10px;
    > span {
            padding: 0px;

            > svg {
                width: 18px;
                height: 18px;
            }
        }
`;


export function TestApp() {
    return (
        <div>
            <Check className="test" />
            {/* <RowCheckbox >test </RowCheckbox> */}
        </div>
    );

}