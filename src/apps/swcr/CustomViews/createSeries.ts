import { DateTime } from 'luxon';
import { SwcrPackage } from '../models/SwcrPackage';
import { Series } from '../../Construction/Components/ConstructionVisual/Types';
import { themeColors } from '../../Construction/Components';

type Categories = {
    created: number;
    closed: number;
    week: Date;
};
const createCategoriesMap = (categories: DateTime[]): Categories[] => {
    return categories.map((cats) => ({
        created: 0,
        closed: 0,
        week: new Date(cats.toString()),
    }));
};

export const createCreatedClosedSeries = (swcrPackage: SwcrPackage[], categories: DateTime[]) => {
    const categoriesMap = createCategoriesMap(categories);

    swcrPackage.forEach((swcr) => {
        const formattedCreatedDateKey = DateTime.fromJSDate(new Date(swcr.createdAtDate)).startOf(
            'week'
        );

        const formattedClosedDateKey = DateTime.fromJSDate(new Date(swcr.closedAtDate))
            .startOf('week')
            .toString();

        const currentCreated = categoriesMap.find(
            ({ week }) =>
                new Date(week.toString()).getTime() ===
                new Date(formattedCreatedDateKey.toString()).getTime()
        );
        currentCreated && currentCreated.created++;

        const currentClosed = categoriesMap.find(
            ({ week }) =>
                new Date(week.toString()).getTime() ===
                new Date(formattedClosedDateKey.toString()).getTime()
        );
        currentClosed && currentClosed.closed++;
    });
    const s1: Series = {
        label: 'Created',
        data: categoriesMap.map((val) => val.created),
        backgroundColor: themeColors.bar[0],
    };

    const s2: Series = {
        label: 'Closed',
        data: categoriesMap.map((val) => val.closed),
        backgroundColor: themeColors.bar[1],
    };

    return [s1, s2];
};
type CategoriesArray = {
    open: number;
    week: Date;
};
const createCategoriesArray = (categories: DateTime[]): CategoriesArray[] => {
    return categories.map((category) => ({
        open: 0,
        week: new Date(category.toString()),
    }));
};

const dateHelper = (date: string) => {
    if (date === '') {
        const today = new Date();
        today.setDate(today.getDate() + 7);
        return today;
    }
    return DateTime.fromJSDate(new Date(date)).startOf('week').toJSDate();
};
const getEndOfWeekDate = (date: Date): Date => DateTime.fromJSDate(date).endOf('week').toJSDate();
const isCreatedBeforeCurrentWeek = (createdDate: Date, dateToCheck: Date): boolean =>
    createdDate.getTime() <= dateToCheck.getTime();
const isClosedAfterCurrentWeek = (closedDate: Date, dateToCheck: Date): boolean =>
    closedDate.getTime() >= dateToCheck.getTime();

const isOpen = (swcr: SwcrPackage, weekToCheck: Date) => {
    const endOfWeekDate = getEndOfWeekDate(weekToCheck);
    const createdDate = dateHelper(swcr.createdAtDate);
    const closedDate = dateHelper(swcr.closedAtDate);
    return (
        isCreatedBeforeCurrentWeek(createdDate, endOfWeekDate) &&
        isClosedAfterCurrentWeek(closedDate, endOfWeekDate)
    );
};
/**
 * Function to create series for the "Open SWCRs last 20 weeks"
 */
export const createOpenSeries = (data: SwcrPackage[], categories: DateTime[]): Series[] => {
    const categoriesArray = createCategoriesArray(categories);
    categoriesArray.forEach((category) => {
        data.forEach((swcr) => {
            if (
                isOpen(swcr, category.week)
                // &&
                // swcr.status !== 'Closed' &&
                // swcr.status !== 'Closed - Rejected'
            ) {
                category.open++;
            }
        });
    });

    return [
        {
            label: 'Open',
            data: categoriesArray.map(({ open }) => open),
            backgroundColor: themeColors.line[0],
            borderColor: themeColors.line[0],
        },
    ];
};
