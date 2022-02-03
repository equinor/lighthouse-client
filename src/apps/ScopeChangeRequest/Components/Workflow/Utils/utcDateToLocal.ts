export const convertUtcToLocalDate = (date: Date): Date =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
