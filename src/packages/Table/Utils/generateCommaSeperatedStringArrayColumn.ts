export function generateCommaSeperatedStringArrayColumn(
    stringArray: string[],
    maxLength?: number
): string {
    if (
        stringArray === undefined ||
        stringArray.length === 0 ||
        stringArray === null ||
        (stringArray[0] !== undefined && stringArray[0] === null)
    ) {
        return '';
    }
    if (!Array.isArray(stringArray)) {
        return stringArray;
    }
    const length = maxLength ? maxLength : 3;
    let commaString = '';
    const usedStrings: string[] = [];
    let stringCount = 0;
    stringArray?.forEach((stringValue: string) => {
        if (stringCount < length && !usedStrings.some((x) => x === stringValue)) {
            commaString !== '' ? (commaString += ', ') : null;
            commaString += stringValue;
        }
        if (!usedStrings.some((x) => x === stringValue)) {
            stringCount = stringCount += 1;
        }
        usedStrings.push(stringValue);
    });
    if (stringCount > length) {
        commaString += ' (+' + (stringCount - length).toString() + ')';
    }
    return commaString;
}
