import styled from 'styled-components';
import { WoMapCount } from '..';
import { tokens } from '@equinor/eds-tokens';
import { useCallback } from 'react';
import { openSidesheet } from '@equinor/sidesheet';
import { SidesheetContent } from '@equinor/Diagrams';

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
    width: fit-content;
    gap: 0.2em;
    cursor: pointer;
`;
type WoNumbersDisplayProps<T> = {
    filtered: WoMapCount<T>;
    groupedKey: string;
    keysOfFiltered: string[];
};

export const WoNumbersDisplay = <T extends unknown>({
    filtered,
    groupedKey,
    keysOfFiltered,
}: WoNumbersDisplayProps<T>): JSX.Element => {
    const onClick = useCallback((item: T[]) => {
        openSidesheet(SidesheetContent, { data: item });
    }, []);
    return (
        <>
            {Object.values(filtered[groupedKey]).map((item, index) => {
                switch (keysOfFiltered[index]) {
                    case 'one':
                        return (
                            <WoNumbers key={index} onClick={() => onClick(item.workorder)}>
                                {item.count === 0 ? (
                                    <Circle circleColor={CircleColor.SUCCESS} />
                                ) : (
                                    <Triangle />
                                )}
                                {item.count}
                            </WoNumbers>
                        );
                    case 'two':
                        return (
                            <WoNumbers key={index} onClick={() => onClick(item.workorder)}>
                                {item.count === 0 ? (
                                    <Circle circleColor={CircleColor.SUCCESS} />
                                ) : item.count >= 5 ? (
                                    <Triangle />
                                ) : (
                                    <Circle circleColor={CircleColor.WARNING} />
                                )}
                                {item.count}
                            </WoNumbers>
                        );
                    case 'three':
                        return (
                            <WoNumbers key={index} onClick={() => onClick(item.workorder)}>
                                {item.count === 0 ? (
                                    <Circle circleColor={CircleColor.SUCCESS} />
                                ) : item.count >= 10 ? (
                                    <Triangle />
                                ) : (
                                    <Circle circleColor={CircleColor.WARNING} />
                                )}
                                {item.count}
                            </WoNumbers>
                        );
                    case 'four':
                        return (
                            <WoNumbers key={index} onClick={() => onClick(item.workorder)}>
                                {item.count < 50 ? (
                                    <Circle circleColor={CircleColor.SUCCESS} />
                                ) : (
                                    <Triangle />
                                )}
                                {item.count}
                            </WoNumbers>
                        );
                    default:
                        return <WoNumbers key={index}></WoNumbers>;
                }
            })}
        </>
    );
};
