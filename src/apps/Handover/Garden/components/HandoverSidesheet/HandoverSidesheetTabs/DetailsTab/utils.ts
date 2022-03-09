export const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    if (date.toString() === 'Invalid Date') return 'N/A';
    const dateParts = new Intl.DateTimeFormat(undefined).formatToParts(date);
    return `${dateParts[0].value}/${dateParts[2].value}/${dateParts[4].value}`;
};
