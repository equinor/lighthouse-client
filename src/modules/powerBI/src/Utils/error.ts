export const errorHeaderTitle = (contextErrorType: string): string => {
    switch (contextErrorType) {
        case 'NotAuthorized':
            return 'It looks like you do not have access to the selected context';
        case 'NotAuthorizedReport':
            return 'It looks like you do not have access to this report';
        case 'MissingContextRelation':
            return 'No data available for selected context';
        default:
            return 'An unknown error occurred';
    }
};
