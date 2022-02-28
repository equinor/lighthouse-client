export function camelCaseToHumanReadable(value: string): string {
    let a = value[0].toUpperCase();

    for (let i = 1; i < value.length; i++) {
        if (value[i] === value[i].toUpperCase()) {
            a += ` ${value[i].toLowerCase()}`;
        } else {
            a += value[i];
        }
    }
    return a;
}
