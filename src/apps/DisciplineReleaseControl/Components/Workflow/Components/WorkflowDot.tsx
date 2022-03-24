import { string } from 'prop-types';
import { useMemo } from 'react';
import styled from 'styled-components';
import { PipetestCompletionStatusColors } from '../../../Styles/ReleaseControlColors';
import { PipetestCompletionStatus } from '../../../Types/drcEnums';

interface WorkflowDotProps {
    height?: number;
    width?: number;
    state: 'Outstanding' | 'Complete' | 'Inactive' | 'Error';
    text?: string;
    active: boolean;
}

interface dotStyling {
    color: string;
    stroke: string;
    active: boolean;
    status: string;
}

export const WorkflowDot = ({ state, text, active }: WorkflowDotProps): JSX.Element => {
    const dotProps: dotStyling = useMemo(() => {
        switch (state) {
            case PipetestCompletionStatus.Outstanding:
                return {
                    color: PipetestCompletionStatusColors.OS,
                    stroke: PipetestCompletionStatusColors.OS,
                    text: text,
                    active: active,
                    status: state,
                };

            case PipetestCompletionStatus.Complete:
                return {
                    color: PipetestCompletionStatusColors.OK,
                    stroke: PipetestCompletionStatusColors.OK,
                    text: text,
                    active: active,
                    status: state,
                };
            case PipetestCompletionStatus.Inactive:
                return {
                    color: PipetestCompletionStatusColors.INACTIVE,
                    stroke: PipetestCompletionStatusColors.INACTIVE,
                    text: text,
                    active: active,
                    status: state,
                };
            case 'Error':
                return {
                    color: PipetestCompletionStatusColors.PA,
                    stroke: PipetestCompletionStatusColors.PA,
                    text: text,
                    active: active,
                    status: state,
                };
        }
    }, [active, state, text]);

    return (
        // <svg
        //     width={width}
        //     height={height}
        //     viewBox="0 0 12 12"
        //     fill="none"
        //     xmlns="http://www.w3.org/2000/svg"
        // >
        //     {!active ? (
        //         <circle
        //             cx="6"
        //             cy="6"
        //             r="5.5"
        //             stroke={color.stroke}
        //             fill={color.color}
        //             strokeDasharray="2,2"
        //         />
        //     ) : (
        //         <circle cx="6" cy="6" r="5.5" stroke={color.stroke} fill={color.color} />
        //     )}
        //     <text x="3.5" y="8" fill="#000" fontSize="0.55em">
        //         {text}
        //     </text>
        // </svg>

        <StepCircle color={dotProps.color} active={dotProps.active} status={dotProps.status}>
            {text}
        </StepCircle>
    );
};

type StepCircleProps = {
    color: string;
    active: boolean;
    status: string;
};

export const StepCircle = styled.div<StepCircleProps>`
    width: 16px;
    height: 16px;
    border-radius: 17px;
    font-size: 11px;
    color: ${(p) =>
        p.status === PipetestCompletionStatus.Complete || p.status === 'Error'
            ? '#fff'
            : p.status === PipetestCompletionStatus.Inactive
            ? '#DCDCDC'
            : '#000'};
    line-height: 18px;
    text-align: center;
    background: ${(p) => p.color};
    outline: ${(p) => (!p.active ? '1px dashed #DCDCDC' : null)};
`;
