type ColorRangeInfo = {
    colorStart: number;
    colorEnd: number;
    useEndAsStart: boolean;
};
export const calculatePoint = (i: number, intervalSize: number, colorRangeInfo: ColorRangeInfo) => {
    const { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;

    return useEndAsStart ? colorEnd - i * intervalSize : colorStart + i * intervalSize;
};

export const interpolateColors = (
    dataLength: number,
    colorScale: (colorPoint: number) => any,
    colorRangeInfo: ColorRangeInfo
) => {
    const { colorStart, colorEnd } = colorRangeInfo;

    const colorRange = colorEnd - colorStart;
    const intervalSize = colorRange / dataLength;
    let colorPoint: number;
    let colorArray: any[] = [];

    for (let i = 0; i < dataLength; i++) {
        colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
        colorArray.push(colorScale(colorPoint));
    }

    return colorArray;
};

export const createChart = (
    chartData: { data: any[]; labels: string[] },
    colorScale,
    colorRangeInfo
) => {
    const dataLength = chartData.data.length;

    const COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);

    const myChartOptions = {
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    backgroundColor: COLORS,
                    hoverBackgroundColor: COLORS,
                    data: chartData.data,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
        },
    };
    return myChartOptions;
};
