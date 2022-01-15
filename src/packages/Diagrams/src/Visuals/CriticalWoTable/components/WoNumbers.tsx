import styled from 'styled-components';
import { WoMapCount } from '..';
import { tokens } from '@equinor/eds-tokens';
enum CircleColor {
    WARNING,
    SUCCESS,
}
type CircleProps = {
    circleColor: CircleColor;
};
const Circle = styled.div<CircleProps>`
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${(props) =>
        props.circleColor === CircleColor.WARNING
            ? tokens.colors.interactive.warning__resting.hsla
            : tokens.colors.interactive.success__resting.hsla};
`;
const Triangle = styled.div`
    height: 0;
    width: 0;
    border-style: solid;
    border-width: 0 8px 14px 8px;
    border-color: transparent transparent ${tokens.colors.interactive.danger__resting.hsla}
        transparent;
`;
const WoNumbers = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2em;
`;
type WoNumbersDisplayProps = {
    filtered: WoMapCount;
    discipline: string;
    keysOfFiltered: string[];
};
export const WoNumbersDisplay = ({
    filtered,
    discipline,
    keysOfFiltered,
}: WoNumbersDisplayProps) => {
    return (
        <>
            {Object.values(filtered[discipline]).map((item, index) => {
                switch (keysOfFiltered[index]) {
                    case 'one':
                        return (
                            <WoNumbers key={index}>
                                {item === 0 ? (
                                    <Circle circleColor={CircleColor.SUCCESS} />
                                ) : (
                                    <Triangle />
                                )}
                                {item}
                            </WoNumbers>
                        );
                    case 'two':
                        return (
                            <WoNumbers key={index}>
                                {item === 0 ? (
                                    <Circle circleColor={CircleColor.SUCCESS} />
                                ) : item >= 5 ? (
                                    <Triangle />
                                ) : (
                                    <Circle circleColor={CircleColor.WARNING} />
                                )}
                                {item}
                            </WoNumbers>
                        );
                    case 'three':
                        return (
                            <WoNumbers key={index}>
                                {item === 0 ? (
                                    <Circle circleColor={CircleColor.SUCCESS} />
                                ) : item >= 10 ? (
                                    <Triangle />
                                ) : (
                                    <Circle circleColor={CircleColor.WARNING} />
                                )}
                                {item}
                            </WoNumbers>
                        );
                    case 'four':
                        return (
                            <WoNumbers key={index}>
                                {item < 50 ? (
                                    <Circle circleColor={CircleColor.SUCCESS} />
                                ) : (
                                    <Triangle />
                                )}
                                {item}
                            </WoNumbers>
                        );
                    default:
                        return <WoNumbers key={index}></WoNumbers>;
                }
            })}
        </>
    );
};
